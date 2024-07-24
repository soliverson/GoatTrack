document.addEventListener('DOMContentLoaded', async function () {
    const breedSelect = document.getElementById('breedSelect');
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const dataContainer = document.getElementById('dataContainer');
    const breedTitle = document.getElementById('breedTitle');
    const breedDescription = document.getElementById('breedDescription');

    const fetchGoatBreeds = async () => {
        try {
            loading.style.display = 'block';
            const response = await fetch('/api/goat-breeds');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const breeds = await response.json();
            loading.style.display = 'none';
            return breeds;
        } catch (error) {
            loading.style.display = 'none';
            errorDiv.style.display = 'block';
            errorDiv.textContent = `Error: ${error.message}`;
            console.error('API Error:', error);
        }
    };

    const populateBreedSelect = (breeds) => {
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.name;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });
    };

    breedSelect.addEventListener('change', () => {
        const selectedBreed = breedSelect.value;
        if (selectedBreed) {
            const breed = breeds.find(b => b.name === selectedBreed);
            breedTitle.textContent = breed.name;
            breedDescription.textContent = breed.characteristics;
            dataContainer.style.display = 'block';
        } else {
            dataContainer.style.display = 'none';
        }
    });

    const breeds = await fetchGoatBreeds();
    if (breeds) {
        populateBreedSelect(breeds);
    }
});
