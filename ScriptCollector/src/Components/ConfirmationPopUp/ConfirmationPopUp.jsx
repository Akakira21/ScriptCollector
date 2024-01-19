import React from 'react';
import styles from './ConfirmationPopUp.module.scss';

const ConfirmationPopUp = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <p>{message}</p>
                <button onClick={onConfirm}>Confirmer</button>
                <button onClick={onClose}>Annuler</button>
            </div>
        </div>
    );
};

export default ConfirmationPopUp;
