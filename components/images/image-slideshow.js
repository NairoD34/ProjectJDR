"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

import dfantasyImg from '@/assets/icons/dfantasy.png';
import fantasyImg from '@/assets/icons/fantasy.png';
import futuristeImg from '@/assets/icons/futuriste.png';
import westernImg from '@/assets/icons/western.png';
import loufoqueImg from '@/assets/icons/loufoque.png';

import classes from './image-slideshow.module.css';

const images = [
    { image: dfantasyImg, alt: 'A dark fantasy world with a dark character' },
    { image: fantasyImg, alt: 'A fantasy world with a big castle' },
    { image: futuristeImg, alt: 'A futuristic world in space' },
    { image: westernImg, alt: 'A tractor in the sand' },
    { image: loufoqueImg, alt: 'A weird world with an old drunk man' },

];

export default function ImageSlideshow() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex < images.length - 1 ? prevIndex + 1 : 0
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={classes.slideshow}>
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image.image}
                    className={index === currentImageIndex ? classes.active : ''}
                    alt={image.alt}
                />
            ))}
        </div>
    );
}