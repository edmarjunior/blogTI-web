import React from 'react';
import { MdFavorite } from 'react-icons/md';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { openModal } from "../../../store/modules/auth/actions";
import { curtirConteudo } from "../../../store/modules/conteudo/actions";
import { Card } from '../../../components/Card/styles';
import AuthModal from '../../../components/Modal/Auth';
import Footer from '../../../components/Footer';

import { Aside, LikeButton } from './styles';

export default function Content({ children }) {
    const dispatch = useDispatch();
    const usuario = useSelector(state => state.usuario.perfil);
    const conteudo = useSelector(state => state.conteudo.dados);

    async function handleCurtir() {
        if (conteudo.curtido) {
            toast.info('Este conteúdo já esta curtido, obrigado!');
            return;
        }

        if (usuario?.email) {
            dispatch(curtirConteudo(1, usuario.token))
            return;
        }

        dispatch(openModal());
    }

    return (
        <>
            <Aside>
                <LikeButton type="button" curtido={conteudo.curtido} onClick={handleCurtir}>
                    <MdFavorite color="#ff0000" size={30} />
                </LikeButton>
                <span>{conteudo.quantidade_curtidas}</span>
                <AuthModal onSuccess={handleCurtir}/>
            </Aside>
            <Card>
                {children}
            </Card>
            <Footer />
        </>
    );
}
