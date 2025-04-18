import React, {useEffect, useState} from "react";
import styles from "@/components/arena/map/map-gallery.module.css";
import classes from "../../ui/modal.module.css"
import MapList from "@/components/arena/map/map-list";

export default function MapModal({onSelect, campain}){
    const [showModal, setShowModal] = useState(false);


    const handleClick = () => {
        setShowModal(true);
    }
    const handleSelectMap = (title) => {
        console.log('2', title)
        localStorage.setItem("background", title)
        onSelect(title);
        setShowModal(false);
      };
    return (
        <>
           {campain &&( <button
                className={styles.mapButton}
                onClick={handleClick}
            >
                Selectionner  une map
            </button>)}
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
                            <MapList onSelect={handleSelectMap} campain={campain}/>

                        </div>
                    </div>
                )}
        </>
    )
}