document.addEventListener('DOMContentLoaded', async () => {
    const breedSelect = document.getElementById('breedSelect');
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const dataContainer = document.getElementById('dataContainer');
    const breedTitle = document.getElementById('breedTitle');
    const breedDescription = document.getElementById('breedDescription');

    try {
        loading.style.display = 'block';
        const response = await fetch('/api/breeds');
        const data = await response.json();
        loading.style.display = 'none';

        if (data.length === 0) {
            throw new Error('No data available');
        }

        data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.name;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });

        breedSelect.addEventListener('change', () => {
            const selectedBreed = breedSelect.value;
            const breedInfo = data.find(breed => breed.name === selectedBreed);
            if (breedInfo) {
                breedTitle.textContent = breedInfo.name;
                breedDescription.textContent = breedInfo.description;
                dataContainer.style.display = 'block';
            } else {
                dataContainer.style.display = 'none';
            }
        });
    } catch (error) {
        loading.style.display = 'none';
        errorDiv.style.display = 'block';
        errorDiv.textContent = 'Error fetching breed data';
        console.error('Error:', error);
    }
});
