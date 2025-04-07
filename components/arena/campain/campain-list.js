'use client';
import React, { useState, useEffect } from 'react';
import styles from './campain.module.css';

export default function CampainList({onSelect}) {
    const [campains, setCampains] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        async function fetchCampains(){
            setIsLoading(true);
            const response = await fetch("api/arena/campain");
            if(!response.ok){
                setError("Failed to fetch campain");
                setIsLoading(false);
            }
            const campains = await response.json();
            console.log("non",campains);
            setIsLoading(false);
            setCampains(campains);

        }
        fetchCampains()
    }, []);
    if (isLoading){
        return <div>Chargement...</div>
    }
    if(error){
        return <div>Erreur : {error}</div>
    }

    let campainsContent;

    if(campains){
        campainsContent = <>
            {campains.map((campain, index) => (
                <div key={index} className={styles.campainItem} onClick={()=> onSelect(campain.id)} >

                    <p>{campain.title || 'Map ' + (index + 1)}</p>
                </div>
            ))
            }
        </>
    }
    console.log("oui",campainsContent)
    return (
        <>
            {campainsContent}

        </>
    )
        ;
}
