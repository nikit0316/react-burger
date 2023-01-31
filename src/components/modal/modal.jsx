import React, {useEffect} from 'react';
import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ModalOverlay from "./modal-overlay/modal-overlay";
import ReactDom from "react-dom";

const modalRoot = document.getElementById('root-modals')
const Modal = (props) => {
    const { header, onClose, children } = props;
    useEffect(() => {
        const close = (e) => {
            if(e.keyCode === 27){
                onClose()
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    },[])
    return ReactDom.createPortal(
        <>
        <ModalOverlay onClose={onClose}>
        </ModalOverlay>
            <div className={styles.modal}>
                <div className="pt-15 pl-10 pr-10" style={{ display: 'flex', justifyContent: 'space-between'}}>
                    {header && <p className="text text_type_main-large">{header}</p>}
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
                {children}
            </div>
        </>,
        modalRoot
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    header: PropTypes.string,
    children: PropTypes.element.isRequired
}

export default Modal;