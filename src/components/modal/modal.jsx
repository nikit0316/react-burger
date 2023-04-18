import React, {useEffect} from 'react';
import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ModalOverlay from "./modal-overlay/modal-overlay";
import ReactDom from "react-dom";
import {useNavigate} from "react-router-dom";

const modalRoot = document.getElementById('root-modals')
const Modal = (props) => {
    const { header, children } = props;
    const navigate = useNavigate()
    const onClose = () => {
        navigate('/');
    }
    useEffect(() => {
        const close = (e) => {
            if(e.keyCode === 27){
                onClose()
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    },[onClose])
    return ReactDom.createPortal(
        <>
        <ModalOverlay onClose={props.onClose === undefined ? onClose : props.onClose}>
        </ModalOverlay>
            <div className={styles.modal}>
                <div className={styles.modalHeader + " pt-15 pl-10 pr-10"}>
                    {header && <p className="text text_type_main-large">{header}</p>}
                    <CloseIcon type="primary" onClick={props.onClose === undefined ? onClose : props.onClose}/>
                </div>
                {children}
            </div>
        </>,
        modalRoot
    )
}

Modal.propTypes = {
    header: PropTypes.string,
    children: PropTypes.element.isRequired
}

export default Modal;