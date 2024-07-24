document.addEventListener('DOMContentLoaded', async function() {
    const breedContainer = document.getElementById('breedContainer');
    const loading = document.createElement('div');
    loading.textContent = 'Loading...';
    breedContainer.appendChild(loading);

    try {
        const response = await fetch('/api/goat-breeds');
        const breeds = await response.json();

        loading.remove();

        breeds.forEach(breed => {
            const breedDiv = document.createElement('div');
            breedDiv.classList.add('breed');
            breedDiv.innerHTML = `
                <h2>${breed.name}</h2>
                <p>${breed.characteristics}</p>
            `;
            breedContainer.appendChild(breedDiv);
        });
    } catch (error) {
        loading.textContent = 'Error loading breeds data';
        console.error('Error loading breeds data:', error);
    }
});
