'use client';
import React, { useEffect } from 'react';
import styles from './modal.module.css';

export default function Modal({ isOpen, onClose, children }) {
    console.log('Modal component rendered, isOpen:', isOpen);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
}
