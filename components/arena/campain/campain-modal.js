import React, {useEffect, useState} from "react";
import styles from "@/components/arena/campain/campain.module.css";
import classes from "../../ui/modal.module.css"
import CampainList from "@/components/arena/campain/campain-list";

export default function CampainModal({onSelect}){
    const [showModal, setShowModal] = useState(false);


    const handleClick = () => {
        setShowModal(true);
    }
    return (
        <>
            <button
                className={styles.campainButton}
                onClick={handleClick}
            >
                Selectionner  une campagne
            </button>
            {showModal &&
                (
                    <div className={classes.modalOverlay}>
                        <div className={classes.modalContent}>
                            <h2>Sélectionner une map</h2>
                            <button
                                className={classes.closeButton}
                                onClick={() => setShowModal(false)}
                            >
                                ×
                            </button>
                            <CampainList onSelect={onSelect}/>

                        </div>
                    </div>
                )}
        </>
    )
}