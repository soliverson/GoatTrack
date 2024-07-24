document.addEventListener('DOMContentLoaded', async function() {
    const breedSelect = document.getElementById('breedSelect');
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const dataContainer = document.getElementById('dataContainer');
    const breedTitle = document.getElementById('breedTitle');
    const breedDescription = document.getElementById('breedDescription');

    const fetchGoatBreeds = async () => {
        try {
            loading.classList.remove('hidden');
            const response = await fetch('/api/goat-breeds');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching goat breeds:', error);
            throw error;
        } finally {
            loading.classList.add('hidden');
        }
    };

    const populateBreedSelect = async () => {
        try {
            const breeds = await fetchGoatBreeds();
            breeds.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed.name;
                option.textContent = breed.name;
                breedSelect.appendChild(option);
            });
        } catch (error) {
            errorDiv.textContent = 'Error loading breeds';
            errorDiv.classList.remove('hidden');
        }
    };

    breedSelect.addEventListener('change', async function() {
        const selectedBreed = breedSelect.value;
        if (!selectedBreed) return;

        loading.classList.remove('hidden');
        try {
            const response = await fetch(`/api/goat-breeds/${selectedBreed}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            breedTitle.textContent = data.name;
            breedDescription.textContent = data.characteristics;
            dataContainer.classList.remove('hidden');
        } catch (error) {
            errorDiv.textContent = 'Error loading breed data';
            errorDiv.classList.remove('hidden');
        } finally {
            loading.classList.add('hidden');
        }
    });

    await populateBreedSelect();
});
