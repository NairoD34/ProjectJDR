/**
 * Page de l'arène de combat
 * Cette page permet d'afficher et gérer la grille de combat pour les parties de JDR
 */

'use client';
import Grid from "@/components/arena/grid";
import BG from "@/assets/icons/western.png"  // Image de fond pour le thème western
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function ArenaPage() {
    const [showModal, setShowModal] = useState(false);
    const [selectedMap, setSelectedMap] = useState(BG);
    const [maps, setMaps] = useState([]);

    useEffect(() => {
        // Charger les maps au chargement de la page
        fetch('/api/maps')
            .then(res => res.json())
            .then(data => {
                console.log('Maps loaded:', data);
                setMaps(data);
            })
            .catch(error => console.error('Error loading maps:', error));
    }, []);

    return (
        <div className={styles.arenaContainer}>
            <button 
                className={styles.mapButton}
                onClick={() => {
                    console.log('Button clicked');
                    setShowModal(true);
                }}
            >
                Changer de map
            </button>
            
            <Grid background={selectedMap}/>

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>Sélectionner une map</h2>
                        <button 
                            className={styles.closeButton}
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>
                        <div className={styles.mapGrid}>
                            {maps.map((map, index) => (
                                <div 
                                    key={map.id} 
                                    className={styles.mapItem} 
                                    onClick={() => {
                                        setSelectedMap(map.filename);
                                        setShowModal(false);
                                    }}
                                >
                                    <img 
                                        src={`project-jdr-bucket.s3.amazonaws.com/${map.filename}`}
                                        alt={map.name} 
                                    />
                                    <p>{map.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}