import React, { useState, useEffect } from 'react';
import '/dist/styles.css';
import goat1 from '/public/images/goatfence.webp';
import goat2 from '/public/images/goatsierra.webp';
import goat3 from '/public/images/lamancha.webp';
import goat4 from '/public/images/lamancha2.webp';

const Home = () => {
    const images1 = [goat1, goat2];
    const images2 = [goat3, goat4];

    const [currentImageIndex1, setCurrentImageIndex1] = useState(0);
    const [currentImageIndex2, setCurrentImageIndex2] = useState(0);

    useEffect(() => {
        const intervalId1 = setInterval(() => {
            setCurrentImageIndex1((prevIndex) => (prevIndex + 1) % images1.length);
        }, 3000); // Change image every 3 seconds

        const intervalId2 = setInterval(() => {
            setCurrentImageIndex2((prevIndex) => (prevIndex + 1) % images2.length);
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
                <img src={images1[currentImageIndex1]} alt="Goat 1" className="carousel-image" />
                <img src={images2[currentImageIndex2]} alt="Goat 2" className="carousel-image" />
            </div>
        </div>
    );
};

export default Home;
