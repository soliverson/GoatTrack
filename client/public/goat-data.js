document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    
    const typeSelect = document.getElementById('typeSelect');
    const stateSelectContainer = document.getElementById('stateSelectContainer');
    const stateSelect = document.getElementById('stateSelect');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const dataContainer = document.getElementById('dataContainer');
    const dataTitle = document.getElementById('dataTitle');
    const dataBody = document.getElementById('dataBody');
    
    console.log('DOM elements assigned');
    
    typeSelect.addEventListener('change', () => {
        const type = typeSelect.value;
        console.log('Type selected:', type);
        if (type) {
            fetchData(type);
        } else {
            dataContainer.classList.add('hidden');
        }
    });

    async function fetchData(type) {
        console.log('Starting fetchData');
        loading.classList.remove('hidden');
        error.classList.add('hidden');
        dataContainer.classList.add('hidden');
        
        const apiUrl = CONFIG.API_URL;
        console.log('Fetching goat data from URL:', apiUrl);
        
        try {
            const response = await fetch(apiUrl);
            console.log('Response:', response);
            
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            
            const text = await response.text();
            console.log('Response text:', text);
            
            let data;
            try {
                data = JSON.parse(text);
                console.log('Fetched goat data:', data);
            } catch (e) {
                throw new Error('API Error: ' + e.message);
            }
            
            if (!data) {
                throw new Error('No data received');
            }
            
            populateData(data, type);
        } catch (err) {
            console.error('API Error:', err);
            showError(err.message);
        } finally {
            loading.classList.add('hidden');
        }
    }

    function populateData(data, type) {
        console.log('Populating data');
        dataBody.innerHTML = '';
        dataTitle.textContent = `Showing ${type} goats`;
        if (type === 'dairy' || type === 'meat') {
            document.getElementById('typeHeader1').textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Count`;
            document.getElementById('typeHeader2').textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Farms`;
        } else {
            document.getElementById('typeHeader1').textContent = 'Dairy Count';
            document.getElementById('typeHeader2').textContent = 'Meat Count';
        }
        
        data.features.forEach(feature => {
            const attributes = feature.attributes;
            console.log('Item:', attributes);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${attributes.STATE_NAME}</td>
                <td>${attributes.Name}</td>
                <td>${attributes.y17_M119_valueText || 'N/A'}</td>
                <td>${attributes.y17_M120_valueText || 'N/A'}</td>
            `;
            dataBody.appendChild(row);
        });
        
        dataContainer.classList.remove('hidden');
    }

    function showError(message) {
        console.log('Error:', message);
        error.textContent = `Error: ${message}`;
        error.classList.remove('hidden');
    }
});
