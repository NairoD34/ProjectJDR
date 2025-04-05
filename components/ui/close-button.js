"use client";

import {useState} from "react";
import styles from "./modal.module.css";

export default function DeleteButton ({item}) {
    console.log("Delete button", item);
    const [showModal, setShowModal] = useState(false);
    const handleClick = () => setShowModal(true);
    const deleteCampain = async () => {
        await fetch(`/api/campain/${item.id}`, {
            method: 'DELETE',
        });
        window.location.reload(); // Rafraîchir la page pour afficher les modifications sur la liste des campagnes.
    };
    return (
        <>
        <p className={styles.deleteButton} onClick={handleClick}>x</p>
            {showModal && (
            <div
                className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <h2>Etes vous sur de vouloir supprimer cette campagne ?</h2>
                    <button
                        className={styles.closeButton}
                        onClick={() => setShowModal(false)}
                    >
                        ×
                    </button>
                    <button
                        className={styles.validateButton}
                        onClick={deleteCampain}
                    >
                        Valider
                    </button>

                </div>
            </div>)
            }
        </>
    );
}

