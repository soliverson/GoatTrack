document.addEventListener('DOMContentLoaded', function() {
    const images1 = ['/images/goatfence.webp', '/images/goatsierra.webp'];
    const images2 = ['/images/lamancha.webp', '/images/lamancha2.webp'];
  
    let currentImageIndex1 = 0;
    let currentImageIndex2 = 0;
  
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
  
    function changeImage1() {
      image1.classList.add('fade-out');
      setTimeout(() => {
        currentImageIndex1 = (currentImageIndex1 + 1) % images1.length;
        image1.src = images1[currentImageIndex1];
        image1.classList.remove('fade-out');
      }, 500); // Match the fade transition duration
    }
  
    function changeImage2() {
      image2.classList.add('fade-out');
      setTimeout(() => {
        currentImageIndex2 = (currentImageIndex2 + 1) % images2.length;
        image2.src = images2[currentImageIndex2];
        image2.classList.remove('fade-out');
      }, 500); // Match the fade transition duration
    }
  
    setInterval(changeImage1, 3000); // Change image every 3 seconds
    setInterval(changeImage2, 3000); // Change image every 3 seconds
  });
  