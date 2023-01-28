import React from "react";
import ReactDom from "react-dom";
import styles from "./modal-overlay.module.css";
import Modal from "../modal";
import PropTypes from "prop-types";

const modalRoot = document.getElementById('root-modals')


const ModalOverlay = (props) => {
    const {onClose, header, children} = props;
    return ReactDom.createPortal(
        <div>
        <Modal onClose={onClose} header={header}>
            {children}
        </Modal>
        <div onClick={onClose} className={styles.modalOverlay}>
        </div>
        </div>,
        modalRoot
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
    header: PropTypes.string,
    children: PropTypes.element.isRequired
}
export default ModalOverlay;