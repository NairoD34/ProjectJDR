'use client';
import React, { useState, useEffect } from 'react';
import styles from './map-gallery.module.css';

export default function MapList({ onSelect }) {
    const [maps, setMaps] = useState();
    const [showModal, setShowModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        async function fetchMaps(){
            setIsLoading(true);
            const response = await fetch("api/arena/maps");
            if(!response.ok){
                setError("Failed to fetch maps");
                setIsLoading(false);
            }
            const maps = await response.json();
            setIsLoading(false);
            setMaps(maps);

        }
        fetchMaps()
    }, []);
    if (isLoading){
        return <div>Chargement...</div>
    }
    if(error){
        return <div>Erreur : {error}</div>
    }
    const handleClick = () => {
        setShowModal(true);
    }
    let mapsContent;

    if(maps){
        mapsContent = <>{maps.map((map, index) => (
                <div key={index} className={styles.mapItem} onClick={()=> onSelect(map.filename)} >
                    <img
                        src={`https://project-jdr-bucket.s3.amazonaws.com/maps/${map.filename}`}
                        alt={map.title || 'Map'}
                        className={styles.mapImage}
                    />
                    <p>{map.title || 'Map ' + (index + 1)}</p>
                </div>
            ))
        }
        </>
    }

    return (
        <>
        <button
            className={styles.mapButton}
            onClick={handleClick}
        >
            Changer de map
        </button>
            {showModal && maps &&
                (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <h2>Sélectionner une map</h2>
                            <button
                                className={styles.closeButton}
                                onClick={() => setShowModal(false)}
                            >
                                ×
                            </button>
                            {mapsContent}
                        </div>
                    </div>
                )}
        </>
)
    ;
}
