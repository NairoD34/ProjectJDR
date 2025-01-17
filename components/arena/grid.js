"use client";
import React, { useState } from 'react';
import styles from './grid.module.css'

export default function Grid({background}){
    const [x, setX] = useState(8);
    const [y, setY] = useState(8);
    return (
        <>
        <div className={styles.xyinputs}>
            <input type="number" value={x} onChange={(e) => setX(parseInt(e.target.value))}/>
            <input type="number" value={y} onChange={(e) => setY(parseInt(e.target.value))}/>
        </div>
        <div className={styles.contenant}>
        <table className={styles.table} style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover"
            }}>
            <tbody>
                {[...Array(y)].map((_, rowIndex) => (
                    <tr className={styles.tr} key={rowIndex}>
                        {[...Array(x)].map((_, colIndex) => (
                            <td className={styles.td} key={`${rowIndex}-${colIndex}`">

                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </>
    );
}