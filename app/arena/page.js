/**
 * Page de l'arène de combat
 * Cette page permet d'afficher et gérer la grille de combat pour les parties de JDR
 */

'use client';
import Grid from "@/components/arena/grid";
import { useState, useEffect } from 'react';
import MapList from "@/components/arena/map/map-list";
import styles from './page.module.css';

export default function ArenaPage() {

    const [selectedMap, setSelectedMap] = useState();
    console.log("pouet",selectedMap)
    return (
        <div className={styles.arenaContainer}>

            
            <Grid background={selectedMap}/>
            <MapList onSelect={(filename) => {
                setSelectedMap(filename);  // récupère la map
                setShowModal(false);       // ferme la modale
            }}
                     onClose={() => setShowModal(false)}/>

        </div>
    );
}