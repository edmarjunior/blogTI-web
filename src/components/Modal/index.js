import React from 'react';
import { Modal as ModalBt, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";

import { closeModal } from "../../store/modules/auth/actions";

export default function Modal({ children, title, onSuccess: onSuccessCallBack = () => {}}) {
    const dispatch = useDispatch();
    const show = useSelector(state => state.auth.show);

    function onHide() {
        dispatch(closeModal());
    }

    return(
        <ModalBt show={show} onHide={onHide}>
            <ModalBt.Header closeButton>
                <ModalBt.Title>{title}</ModalBt.Title>
            </ModalBt.Header>
            <ModalBt.Body>
                {children}
            </ModalBt.Body>
            <ModalBt.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
            </ModalBt.Footer>
        </ModalBt>
    );
}