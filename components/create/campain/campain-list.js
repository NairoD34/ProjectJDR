"use client";
import CampainItem from "./campain-item"
import React, {useEffect, useState} from "react";

import styles from './campain-list.module.css';
import classes from '../../ui/modal.module.css';
import DeleteButton from "@/components/ui/close-button";

export default function CampainList() {
    const [campains, setCampains] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [campainToDelete, setCampainToDelete] = useState(null);

    useEffect(() => {
        async function fetchCampains() {
            setIsLoading(true);
            try {
                const response = await fetch('/api/campain');
                if (!response.ok) throw new Error("Fetch error");
                const data = await response.json();
                setCampains(data);
            } catch (e) {
                setError(e.message);
            }
            setIsLoading(false);
        }

        fetchCampains();
    }, []);

    const handleDelete = async () => {
        if (!campainToDelete) return;

        try {
            const res = await fetch(`/api/campain/${campainToDelete.id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
            setCampainToDelete(null);
            window.location.reload(); // ou tu filtres setCampains()
        } catch (err) {
            alert("Erreur de suppression");
            console.error(err);
        }
    };

    if (isLoading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;

    return (
        <div className={styles.campaignsContainer}>
            {campains.map(campain => (
                <CampainItem
                    key={campain.id}
                    campain={campain}
                    onDeleteClick={setCampainToDelete}
                />
            ))}

            {campainToDelete && (
                <div className={classes.modalOverlay} onClick={() => setCampainToDelete(null)}>
                    <div
                        className={classes.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className={classes.header}>Etes vous sur de vouloir supprimer la
                            campagne {campainToDelete.title} ?</h2>
                        <button
                            className={classes.closeButton}
                            onClick={() => setCampainToDelete(null)}
                        >
                            ×
                        </button>
                        <button className={classes.validateButton} onClick={handleDelete}>Valider</button>
                    </div>
                </div>)
            }
        </div>
            );
            }
