import React, { useEffect, useState } from "react";
import styles from "@/components/arena/campain/campain.module.css";
import classes from "../../ui/modal.module.css";
import CampainList from "@/components/arena/campain/campain-list";

export default function CampainModal({ onSelect, campain }) {
    const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [dataCheck, setDataCheck] = useState(null);

    useEffect(() => {
        const existing = localStorage.getItem("campainStorage");
        if (existing) {
            setDataCheck(existing);
        }
    }, []);

    const handleClick = () => {
        // S'il y a une campagne déjà en mémoire, on demande confirmation
        if (dataCheck) {
            setShowConfirm(true);
        } else {
            setShowModal(true);
        }
    };

    const handleSelectCampain = (campain) => {
        const campainString = JSON.stringify(campain);
        localStorage.setItem("campainStorage", campainString);
        setDataCheck(campainString); // 🔥 on met à jour pour que la modale de confirmation refonctionne plus tard
        onSelect(campain);
        setShowModal(false);
    };

    const handleConfirm = () => {
        localStorage.clear();
        setDataCheck(null);
        setShowConfirm(false);
        setShowModal(true); // on ouvre la modale après validation
    };

    return (
        <>
            {campain && <h2 className={styles.campainTitle}>{campain.name}</h2>}

            <button className={styles.campainButton} onClick={handleClick}>
                Sélectionner une campagne
            </button>

            {/* MODALE DE CONFIRMATION */}
            {showConfirm && (
                <div className={classes.modalOverlay}>
                    <div className={classes.modalContent}>
                        <h2>Une campagne est déjà en cours</h2>
                        <p>Êtes-vous sûr de vouloir en lancer une autre ?</p>
                        <button
                            className={classes.closeButton}
                            onClick={() => setShowConfirm(false)}
                        >
                            ×
                        </button>
                        <button onClick={handleConfirm}>Valider</button>
                        <button onClick={() => setShowConfirm(false)}>Annuler</button>
                    </div>
                </div>
            )}

            {/* MODALE DE SÉLECTION */}
            {showModal && (
                <div className={classes.modalOverlay}>
                    <div className={classes.modalContent}>
                        <h2>Sélectionner une Campagne</h2>
                        <button
                            className={classes.closeButton}
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>
                        <CampainList onSelect={handleSelectCampain} />
                    </div>
                </div>
            )}
        </>
    );
}
