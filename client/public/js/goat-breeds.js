console.log('goat-breeds.js loaded');

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');

    const breedSelect = document.getElementById('breedSelect');
    const dataContainer = document.getElementById('dataContainer');
    const breedTitle = document.getElementById('breedTitle');
    const breedDescription = document.getElementById('breedDescription');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const carouselImage = document.getElementById('carouselImage');
    const namesList = document.getElementById('namesList');

    if (!carouselImage) {
        console.error('Carousel image element not found');
        return;
    }

    
    const carouselImages = [
        "images/goatfence.webp",
        "images/goatsierra.webp",
        "images/lamancha.webp",
        "images/lamancha2.webp"
    ];

    let currentImageIndex = 0;

    function startCarousel(images) {
        console.log('Starting carousel with images:', images);
        if (!images || images.length === 0) {
            carouselImage.src = '';
            return;
        }
        currentImageIndex = 0;
        carouselImage.src = images[currentImageIndex];
        console.log('Initial image:', carouselImage.src);
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            carouselImage.src = images[currentImageIndex];
            console.log('Changing to image:', carouselImage.src);
        }, 3000); 
    }

    startCarousel(carouselImages);

    try {
        loading.classList.remove('hidden');
        const response = await fetch('/api/goat-breeds');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        breedSelect.innerHTML = '<option value="">Select Breed</option>';

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
                breedDescription.innerHTML = formatCharacteristics(selectedBreed.characteristics);
                dataContainer.classList.remove('hidden');
            } else {
                dataContainer.classList.add('hidden');
            }
        });

        const namesResponse = await fetch('https://api.api-ninjas.com/v1/babynames?gender=neutral', {
            headers: { 'X-Api-Key': process.env.API_NINJAS_KEY } 
        });
        if (!namesResponse.ok) {
            const errorResponse = await namesResponse.text();
            throw new Error(`HTTP error! status: ${namesResponse.status}, response: ${errorResponse}`);
        }
        const namesData = await namesResponse.json();
        console.log('Names data:', namesData); 
        namesList.innerHTML = '';
        namesData.forEach(name => {
            const listItem = document.createElement('li');
            listItem.textContent = name; 
            namesList.appendChild(listItem);
        });

    } catch (err) {
        console.error('Fetch Error:', err);
        error.textContent = `API Error: ${err.message}`;
        error.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }

    function formatCharacteristics(characteristics) {
        return `
            <ul>
                ${Object.entries(characteristics).map(([key, value]) => `<li><strong>${formatKey(key)}:</strong> ${value}</li>`).join('')}
            </ul>
        `;
    }

    function formatKey(key) {
        return key.replace(/_/g, ' ').replace(/(\b[a-z](?!\s))/g, char => char.toUpperCase());
    }
});
