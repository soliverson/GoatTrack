import React, { useState, useEffect } from 'react';
import '../styles.css';

const Home = () => {
    const images1 = ['/images/goatfence.webp', '/images/goatsierra.webp'];
    const images2 = ['/images/lamancha.webp', '/images/lamancha2.webp'];

    const [currentImageIndex1, setCurrentImageIndex1] = useState(0);
    const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
    const [fade1, setFade1] = useState(false);
    const [fade2, setFade2] = useState(false);

    useEffect(() => {
        const intervalId1 = setInterval(() => {
            setFade1(true);
            setTimeout(() => {
                setCurrentImageIndex1((prevIndex) => (prevIndex + 1) % images1.length);
                setFade1(false);
            }, 500); // Match the fade transition duration
        }, 3000); // Change image every 3 seconds

        const intervalId2 = setInterval(() => {
            setFade2(true);
            setTimeout(() => {
                setCurrentImageIndex2((prevIndex) => (prevIndex + 1) % images2.length);
                setFade2(false);
            }, 500); // Match the fade transition duration
        }, 3000); // Change image every 3 seconds

        return () => {
            clearInterval(intervalId1);
            clearInterval(intervalId2);
        };
    }, [images1.length, images2.length]);

    return (
        <div className="content">
            <h1>Welcome to GoatTrack</h1>
            <p>
                Welcome to GoatTrack, your comprehensive resource for managing goat herds and accessing detailed information on various goat breeds.
                This app provides essential tips on goat health care, feeding, and management. It also includes features for tracking individual goats'
                profiles, health records, and breeding history. Join our community forum to share knowledge and discuss goat-related topics with fellow enthusiasts.
            </p>
            <div className="image-carousel">
                <img src={images1[currentImageIndex1]} alt="Goat 1" className={`carousel-image ${fade1 ? 'fade-out' : ''}`} />
                <img src={images2[currentImageIndex2]} alt="Goat 2" className={`carousel-image ${fade2 ? 'fade-out' : ''}`} />
            </div>
        </div>
    );
};

export default Home;
