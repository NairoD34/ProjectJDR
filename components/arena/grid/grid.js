"use client";
import React, { useState } from 'react';
import styles from './grid.module.css'
import MapModal from "@/components/arena/map/map-modal";

export default function Grid(){
    const [x, setX] = useState(8);
    const [y, setY] = useState(8);
    const [background, setBackground] = useState();
    return (
        <>
            <MapModal onSelect={setBackground}/>
        <div className={styles.gridContainer}>
            <div className={styles.contenant}>
                <table className={styles.table} style={{
                    backgroundImage: `url(https://project-jdr-bucket.s3.amazonaws.com/maps/${background})`,
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
                    <input type="number" value={x} min="4" max="10" onChange={(e) => setX(parseInt(e.target.value))}/>
                </div>
                <div>
                    <label>Hauteur:</label>
                    <input type="number" value={y} min="4" max="10" onChange={(e) => setY(parseInt(e.target.value))}/>
                </div>
            </div>
        </div>
        </>

    )
}