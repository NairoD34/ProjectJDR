"use client";
import { useState } from "react";
import classes from "./new-campain.module.css";
import CampainFormSubmit from "@/components/create/campain/campain-form-submit";

export default function CreateCampain() {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const handleClick = () => setShowModal(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            setError("Veuillez entrer un nom de campagne.");
            return;
        }

        const res = await fetch(`/api/campain`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });

        if (!res.ok) {
            setError("Une erreur s'est produite.");
        } else {
            window.location.reload();
        }
    };

    return (
        <>
            <button onClick={handleClick} className={classes.newCampainButton}>
                Créer une campagne
            </button>

            {showModal && (
                <div className={classes.modalOverlay}>
                    <div className={classes.header}>
                        <h1>
                            Créer votre <span className={classes.highlight}>campagne</span>
                        </h1>
                    </div>
                    <div className={classes.modalContent}>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <div className={classes.row}>
                                <label htmlFor="name">Nom de votre campagne</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <p className={classes.actions}>
                                <CampainFormSubmit />
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}