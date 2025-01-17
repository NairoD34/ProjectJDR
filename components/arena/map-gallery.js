'use client';
import React, { useState, useEffect } from 'react';
import styles from './map-gallery.module.css';

export default function MapGallery({ onSelect }) {
    const [maps, setMaps] = useState([]);

    useEffect(() => {
        // Charger les maps depuis la base de données
        fetch('/api/maps')
            .then(res => res.json())
            .then(data => setMaps(data))
            .catch(error => console.error('Error loading maps:', error));
    }, []);

    return (
        <div className={styles.gallery}>
            <h2>Sélectionnez une map</h2>
            <div className={styles.grid}>
                {maps.map((map, index) => (
                    <div key={index} className={styles.mapItem} onClick={() => onSelect(map.filename)}>
                        <img 
                            src={`project-jdr-bucket.s3.amazonaws.com/${map.filename}`}
                            alt={map.name || 'Map'}
                            className={styles.mapImage}
                        />
                        <p>{map.name || 'Map ' + (index + 1)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
