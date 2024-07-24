document.addEventListener('DOMContentLoaded', async function() {
    const breedSelect = document.getElementById('breedSelect');
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const dataContainer = document.getElementById('dataContainer');
    const breedTitle = document.getElementById('breedTitle');
    const breedDescription = document.getElementById('breedDescription');

    const fetchBreedData = async () => {
        try {
            const response = await fetch('/api/breeds');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    };

    const populateBreeds = (breeds) => {
        breedSelect.innerHTML = '<option value="">Select Breed</option>';
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.name;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });
    };

    const showBreedDetails = (breed) => {
        breedTitle.textContent = breed.name;
        breedDescription.textContent = breed.description;
        dataContainer.classList.remove('hidden');
    };

    breedSelect.addEventListener('change', function() {
        const selectedBreed = breedSelect.value;
        if (selectedBreed) {
            const breed = breeds.find(breed => breed.name === selectedBreed);
            showBreedDetails(breed);
        } else {
            dataContainer.classList.add('hidden');
        }
    });

    loading.classList.remove('hidden');
    try {
        const breeds = await fetchBreedData();
        populateBreeds(breeds);
        loading.classList.add('hidden');
    } catch (error) {
        loading.classList.add('hidden');
        errorDiv.classList.remove('hidden');
        errorDiv.textContent = 'Error fetching breed data';
    }
});
