document.addEventListener('DOMContentLoaded', async function() {
    const breedSelect = document.getElementById('breedSelect');
    const breedInfoContainer = document.getElementById('breedInfoContainer');
    const breedName = document.getElementById('breedName');
    const breedDescription = document.getElementById('breedDescription');

    const fetchBreeds = async () => {
        try {
            const response = await fetch('https://api.api-ninjas.com/v1/animals?name=goat', {
                headers: { 'X-Api-Key': 'RryCHvoFypNy7AsAn6DrGg==Wib69zM3mlU9kru0' }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const breeds = await response.json();
            console.log('Fetched breeds:', breeds);
            return breeds;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
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

    breedSelect.addEventListener('change', function() {
        const selectedBreedName = breedSelect.value;
        const selectedBreed = breeds.find(breed => breed.name === selectedBreedName);
        if (selectedBreed) {
            breedName.textContent = selectedBreed.name;
            breedDescription.textContent = selectedBreed.characteristics || 'Description not available.';
            breedInfoContainer.classList.remove('hidden');
        } else {
            breedInfoContainer.classList.add('hidden');
        }
    });

    try {
        const breeds = await fetchBreeds();
        populateBreedSelect(breeds);
    } catch (error) {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Error fetching data';
        document.body.appendChild(errorDiv);
    }
});
