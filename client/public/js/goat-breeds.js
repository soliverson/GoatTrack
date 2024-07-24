document.addEventListener('DOMContentLoaded', async () => {
    const breedSelect = document.getElementById('breedSelect');
    const dataContainer = document.getElementById('dataContainer');
    const breedTitle = document.getElementById('breedTitle');
    const breedDescription = document.getElementById('breedDescription');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
  
    try {
      loading.classList.remove('hidden');
      const response = await fetch('/api/goat-breeds');
      const data = await response.json();
      
      data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.name;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
  
      breedSelect.addEventListener('change', () => {
        const selectedBreed = data.find(breed => breed.name === breedSelect.value);
        if (selectedBreed) {
          breedTitle.textContent = selectedBreed.name;
          breedDescription.textContent = selectedBreed.characteristics || 'No description available';
          dataContainer.classList.remove('hidden');
        }
      });
  
    } catch (err) {
      error.textContent = `API Error: ${err}`;
      error.classList.remove('hidden');
    } finally {
      loading.classList.add('hidden');
    }
  });
  