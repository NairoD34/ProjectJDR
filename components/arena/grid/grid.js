"use client";
import React, {useEffect, useState} from 'react';
import styles from './grid.module.css'
import MapModal from "@/components/arena/map/map-modal";
import CampainModal from "@/components/arena/campain/campain-modal";
import Modal from "@/components/ui/modal";
import HeroesBanner from '../heroes/heroes-banner';

export default function Grid(){
    const [x, setX] = useState(8);
    const [y, setY] = useState(8);
    const [background, setBackground] = useState();
    const [campain, setCampain] = useState();
    const [campainLocal, setCampainLocal] = useState();
    const [backgroundLocal, setBackgroundLocal] = useState();



    useEffect(() => {
        const getLocalData = () => {
            const storedCampain = localStorage.getItem("campainStorage");
            if (storedCampain) {
                setCampainLocal(JSON.parse(storedCampain)); // <-- bien parser !
            }
            const storedBackground = localStorage.getItem("background");
            if (storedBackground) {
                setBackgroundLocal(storedBackground);
            }
        };
    
        getLocalData();
    }, [campain]);
    useEffect(() => {setBackground(null)}, [campain])

    return (
        <>
            <CampainModal onSelect={setCampain} onValidate={setBackground} campain={campainLocal ? campainLocal:campain}/>

            <MapModal onSelect={setBackground} campain={campainLocal ? campainLocal : campain}/>
            <div className={styles.gridContainer}>
                <div className={styles.contenant}>
                    <table className={styles.table} style={{
                        backgroundImage: `url(https://project-jdr-bucket.s3.eu-west-3.amazonaws.com/maps/${backgroundLocal ? backgroundLocal : background})`,
                        backgroundSize: "cover"
                    }}>
                        <tbody>
                        {[...Array(y)].map((_, rowIndex) => (
                            <tr className={styles.tr} key={rowIndex}>
                                {[...Array(x)].map((_, colIndex) => (
                                    <td className={styles.td} key={`${rowIndex}-${colIndex}`}/>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.xyinputs}>
                <div>
                    <label>Largeur:</label>
                    <input type="number" value={x} min="4" max="10" onChange={(e) => setX(parseInt(e.target.value))} onKeyDown={(e) => e.preventDefault()}/>
                </div>
                <div>
                    <label>Hauteur:</label>
                    <input type="number" value={y} min="4" max="10" onChange={(e) => setY(parseInt(e.target.value))} onKeyDown={(e) => e.preventDefault()}/>
                </div>
            </div>
        </div>
         <HeroesBanner campain={campainLocal ? campainLocal : campain} /> 
        </>

    )
}