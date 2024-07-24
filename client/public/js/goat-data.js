document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    
    const elements = {
        typeSelect: document.getElementById('typeSelect'),
        stateSelectContainer: document.getElementById('stateSelectContainer'),
        stateSelect: document.getElementById('stateSelect'),
        loading: document.getElementById('loading'),
        errorDiv: document.getElementById('error'),
        dataContainer: document.getElementById('dataContainer'),
        dataTitle: document.getElementById('dataTitle'),
        dataBody: document.getElementById('dataBody')
    };
    console.log('DOM elements assigned');

    const stateData = {
        data: [],
        states: []
    };

    const fetchGoatData = async () => {
        try {
            console.log('Fetching goat data...');
            const response = await fetch('/api/goat-data');
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            console.log('JSON:', json);
            return json;
        } catch (error) {
            console.error('API Error:', error);
        }
    };

    const processGoatData = (json) => {
        stateData.data = json.features.map(feature => ({
            state: feature.attributes.STATE_NAME,
            county: feature.attributes.Name,
            allGoats: feature.attributes.y17_M119_valueText,
            allGoatsRange: feature.attributes.y17_M119_classRange,
            milkGoats: feature.attributes.y17_M120_valueText,
            milkGoatsRange: feature.attributes.y17_M120_classRange,
            meatGoats: feature.attributes.y17_M121_valueText,
            meatGoatsRange: feature.attributes.y17_M121_classRange,
        }));
        console.log('Processed data:', stateData.data);

        stateData.states = [...new Set(stateData.data.map(item => item.state))];
        elements.stateSelect.innerHTML = '<option value="">Select State</option>';
        stateData.states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            elements.stateSelect.appendChild(option);
        });
    };

    const fetchData = async () => {
        console.log('Starting fetchData');
        elements.loading.style.display = 'block';
        elements.errorDiv.style.display = 'none';
        elements.dataContainer.style.display = 'none';
        try {
            const json = await fetchGoatData();
            console.log('Fetched goat data:', json);
            if (!json || !json.features) {
                throw new Error('No data received');
            }
            processGoatData(json);
            elements.loading.style.display = 'none';
        } catch (error) {
            elements.loading.style.display = 'none';
            elements.errorDiv.style.display = 'block';
            elements.errorDiv.textContent = 'Error fetching data';
            console.error('API Error:', error);
        }
    };

    const handleTypeChange = () => {
        console.log('Type selected:', elements.typeSelect.value);
        const selectedType = elements.typeSelect.value;
        elements.stateSelectContainer.style.display = selectedType ? 'block' : 'none';
        elements.stateSelect.value = '';
        elements.dataBody.innerHTML = '';
        elements.dataContainer.style.display = 'none';
    };

    const handleStateChange = () => {
        console.log('State selected:', elements.stateSelect.value);
        const selectedType = elements.typeSelect.value;
        const selectedState = elements.stateSelect.value;
        const filteredData = stateData.data.filter(item => item.state === selectedState && 
            (selectedType === 'all' || (selectedType === 'dairy' && item.milkGoats) || (selectedType === 'meat' && item.meatGoats)));

        const typeHeaders = {
            all: ['All Goats', 'Range'],
            dairy: ['Milk Goats', 'Range'],
            meat: ['Meat Goats', 'Range']
        };

        [elements.typeHeader1.textContent, elements.typeHeader2.textContent] = typeHeaders[selectedType];

        elements.dataBody.innerHTML = filteredData.map(item => `
            <tr>
                <td>${item.state}</td>
                <td>${item.county}</td>
                <td>${selectedType === 'all' ? item.allGoats : selectedType === 'dairy' ? item.milkGoats : item.meatGoats}</td>
                <td>${selectedType === 'all' ? item.allGoatsRange : selectedType === 'dairy' ? item.milkGoatsRange : item.meatGoatsRange}</td>
            </tr>
        `).join('');

        elements.dataTitle.textContent = `Data for ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Goats in ${selectedState}`;
        elements.dataContainer.style.display = 'block';
    };

    elements.typeSelect.addEventListener('change', handleTypeChange);
    elements.stateSelect.addEventListener('change', handleStateChange);

    console.log('Starting fetchData');
    fetchData();
});
