import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";



const ModalOverlay = (props) => {
    const {onClose} = props;
    return (
        <div onClick={onClose} className={styles.modalOverlay}>
        </div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
}
export default ModalOverlay;