'use client';
import React, { useState, useEffect } from 'react';
import styles from './map-gallery.module.css';

export default function MapList({onSelect}) {
    const [maps, setMaps] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        async function fetchMaps(){
            setIsLoading(true);
            const response = await fetch("api/arena/campain/maps/");
            if(!response.ok){
                setError("Failed to fetch maps");
                setIsLoading(false);
            }
            const maps = await response.json();
            console.log("non",maps);
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

    let mapsContent;

    if(maps){
        mapsContent = <>
            {maps.map((map, index) => (
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
console.log("oui",mapsContent)
    return (
        <>
            {mapsContent}

        </>
)
    ;
}
