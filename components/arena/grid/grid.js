"use client";
import React, {useEffect, useState} from 'react';
import styles from './grid.module.css'
import MapModal from "@/components/arena/map/map-modal";
import CampainModal from "@/components/arena/campain/campain-modal";
import Modal from "@/components/ui/modal";

export default function Grid(){
    const [x, setX] = useState(8);
    const [y, setY] = useState(8);
    const [background, setBackground] = useState();
    const [campain, setCampain] = useState();
    const [campainLocal, setCampainLocal] = useState();
    const [backgroundLocal, setBackgroundLocal] = useState();



    useEffect(() => {
        const getLocalData =  ()=>{
            const comp  = localStorage.getItem("campainStorage");
            console.log("oui", localStorage)
            if(comp){
                setCampainLocal(JSON.parse(comp));
            }


            const comp2 = localStorage.getItem("background");
            if(comp2){
                setBackgroundLocal(comp2);
            }

        }
        getLocalData();
    }, []);
    useEffect(() => {setBackground(null)}, [campain])
    useEffect(() => {console.log("1",campain)}, [])

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
        </>

    )
}