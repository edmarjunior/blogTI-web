import React from "react";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";

import api from '../../../services/api';

import { closeModal } from "../../../store/modules/auth/actions";
import { createUsuario } from "../../../store/modules/usuario/actions";
import Modal from '../index';

export default function AuthModal({ onSuccess: onSuccessCallBack = () => {}}) {
    const dispatch = useDispatch();
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    async function onSuccess(responseAuth) {
        const { email, name, imageUrl: avatarUrl } = responseAuth.profileObj;

        const response = await api.post('/users', { 
            email, 
            name, 
            avatarUrl
        });

        const usuario = response.data;

        dispatch(createUsuario(usuario));

        await onSuccessCallBack(usuario);

        dispatch(closeModal());
    }

    function onFailure() {
        toast.error('Desculpe! tivemos um erro com nosso login social, por favor tente mais tarde');
    }

    return (
        <Modal title="Login social">
            <div className="row" style={{ 'paddingTop': "20px" }}>
                <div className="col-sm-12">
                    Obrigado por interagir com este conteúdo, favor escolher sua forma de acesso.
                </div>
            </div>
            <div className="row" style={{ "paddingTop": "20px", "textAlign":  "center" }}>
                <div className="col-sm-12">
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Login with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure} >
                    </GoogleLogin>
                </div>
            </div>
        </Modal>
    );
}