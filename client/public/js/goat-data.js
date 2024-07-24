// client/public/js/goat-data.js
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOMContentLoaded event fired');
    const typeSelect = document.getElementById('typeSelect');
    const stateSelectContainer = document.getElementById('stateSelectContainer');
    const stateSelect = document.getElementById('stateSelect');
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const dataContainer = document.getElementById('dataContainer');
    const dataTitle = document.getElementById('dataTitle');
    const dataBody = document.getElementById('dataBody');
    console.log('DOM elements assigned');

    let data = [];
    let states = [];

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

    async function fetchData() {
        console.log('Starting fetchData');
        loading.style.display = 'block';
        errorDiv.style.display = 'none';
        dataContainer.style.display = 'none';
        try {
            const json = await fetchGoatData();
            console.log('Fetched goat data:', json);
            if (!json || !json.features) {
                throw new Error('No data received');
            }
            data = json.features.map(feature => ({
                state: feature.attributes.STATE_NAME,
                county: feature.attributes.Name,
                allGoats: feature.attributes.y17_M119_valueText,
                allGoatsRange: feature.attributes.y17_M119_classRange,
                milkGoats: feature.attributes.y17_M120_valueText,
                milkGoatsRange: feature.attributes.y17_M120_classRange,
                meatGoats: feature.attributes.y17_M121_valueText,
                meatGoatsRange: feature.attributes.y17_M121_classRange,
            }));
            console.log('Processed data:', data);

            states = [...new Set(data.map(item => item.state))];
            stateSelect.innerHTML = '<option value="">Select State</option>';
            states.forEach(state => {
                const option = document.createElement('option');
                option.value = state;
                option.textContent = state;
                stateSelect.appendChild(option);
            });

            loading.style.display = 'none';
        } catch (error) {
            loading.style.display = 'none';
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'Error fetching data';
            console.error('API Error:', error);
        }
    }

    typeSelect.addEventListener('change', function() {
        console.log('Type selected:', typeSelect.value);
        const selectedType = typeSelect.value;
        stateSelectContainer.style.display = selectedType ? 'block' : 'none';
        stateSelect.value = '';
        dataBody.innerHTML = '';
        dataContainer.style.display = 'none';
    });

    stateSelect.addEventListener('change', function() {
        console.log('State selected:', stateSelect.value);
        const selectedType = typeSelect.value;
        const selectedState = stateSelect.value;
        const filteredData = data.filter(item => item.state === selectedState && (selectedType === 'all' || (selectedType === 'dairy' && item.milkGoats) || (selectedType === 'meat' && item.meatGoats)));

        if (selectedType === 'all') {
            typeHeader1.textContent = 'All Goats';
            typeHeader2.textContent = 'Range';
        } else if (selectedType === 'dairy') {
            typeHeader1.textContent = 'Milk Goats';
            typeHeader2.textContent = 'Range';
        } else if (selectedType === 'meat') {
            typeHeader1.textContent = 'Meat Goats';
            typeHeader2.textContent = 'Range';
        }

        dataBody.innerHTML = filteredData.map(item => `
            <tr>
                <td>${item.state}</td>
                <td>${item.county}</td>
                <td>${selectedType === 'all' ? item.allGoats : selectedType === 'dairy' ? item.milkGoats : item.meatGoats}</td>
                <td>${selectedType === 'all' ? item.allGoatsRange : selectedType === 'dairy' ? item.milkGoatsRange : item.meatGoatsRange}</td>
            </tr>
        `).join('');

        dataTitle.textContent = `Data for ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Goats in ${selectedState}`;
        dataContainer.style.display = 'block';
    });

    console.log('Starting fetchData');
    await fetchData();
});
