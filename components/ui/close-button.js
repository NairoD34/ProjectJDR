"use client";
import styles from "./modal.module.css"


export default function DeleteButton({ onClick }) {
    return (
        <button className={styles.deleteButton} type="button" onClick={onClick}>
            x
        </button>
    );
}