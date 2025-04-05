"use client";
import CampainItem from "./campain-item"
import React, {useEffect, useState} from "react";

import styles from './campain-list.module.css';

export default function CampainList() {

    const [campains, setCampains]= useState()
    const [error, setError]= useState()
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        async function fetchCampains() {
            setIsLoading(true);
            const response = await fetch('/api/campain');
            if (!response.ok) {
                setError("Failed to fetch campains");
                setIsLoading(false);
            }
            const data = await response.json();
            console.log(data);
            setIsLoading(false)
            setCampains(data);
        }
        fetchCampains();
    },[])
    if (isLoading){
        return <div>Chargement...</div>
    }
    if(error){
        return <div>Erreur : {error}</div>
    }
    let campainsContent;

    if (campains){
        campainsContent = <>{
            campains.map(campain => (
                    <CampainItem key={campain.id} campain={campain}/>
            ))
        }
        </>
    }

    return (
        <div className={styles.campaignsContainer}>
        {campainsContent}
        </div>
    )


}