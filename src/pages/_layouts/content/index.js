import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { parseISO, format } from "date-fns";
import pt from "date-fns/locale/pt";
import { toast } from "react-toastify";
import { MdFavorite } from 'react-icons/md';

import api from '../../../services/api';
import { openModal } from "../../../store/modules/auth/actions";
import AuthModal from '../../../components/Modal/Auth';
import { Loading } from '../../../components/Loading/styles';
import Comments from '../../../components/Comments';
import Footer from '../../../components/Footer';

import { Aside, LikeButton, Article } from './styles';

export default function Content({ children, idConteudo }) {
    const dispatch = useDispatch();
    const usuario = useSelector(state => state.usuario.perfil);
    const [conteudo, setConteudo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregaDados() {
            setLoading(true);
            // buscando ip do usuário
            const responseIp = await api.get('https://api.ipify.org/?format=json');

            // buscando conteúdo
            const { data: response } = await api.get(`/contents/${idConteudo}`, {
                params: { userId: usuario?.id },
                headers: {
                    ip: responseIp.data.ip
                }
            });

            if (!response.ok) {
                toast.info(response.messages[0])
                return
            }

            // buscando comentários
            const { data: responseComments } = await api.get(`/contents/${idConteudo}/comments`, {
                headers: {
                    user_id:  usuario?.id,
                }
            });

            if (!responseComments.ok) {
                toast.info(responseComments.messages[0])
                return
            }

            const { content } = response
            
            setConteudo({
                ...content,
                dataPublicacaoFormatada: format(parseISO(content.createAt, { locale: pt }), 'dd/MM/yyyy'),
                comentarios: responseComments.content
            });

            setLoading(false);
        }
        carregaDados();
    },[idConteudo, usuario])

    async function handleCurtir(usuarioCadastrado) {
        const usuarioLogado = usuario ?? usuarioCadastrado;

        if (conteudo.liked) {
            toast.info('Este conteúdo já esta curtido, obrigado!');
            return;
        }
        
        if (!usuarioLogado?.email) {
            dispatch(openModal());
            return;
        }

        try {
            const { data: response } = await api.post('/likes', 
                {
                    contentId: idConteudo
                }, 
                {
                headers: {
                    Authorization: `bearer ${usuarioLogado.accessToken}`
                }
            });
    
            if (!response.ok) {
                toast.info(response.messages);
                return;
            }

            toast.info("Vlw pelo Like ;)");

            setConteudo({
                ...conteudo,
                amountLikes: conteudo.amountLikes + 1,
            })
        } catch(err) {
            const message = err?.response?.data?.messages[0];
            toast.error(message || 'Ocorreu uma falha, tente novamente mais tarde');
        }
    }

    return (
        <>
            {loading && <Loading center="true" />}
            {!loading && (
                <>
                    <Aside>
                        <LikeButton type="button" curtido={conteudo.liked} onClick={handleCurtir}>
                            <MdFavorite color="#ff0000" size={30} />
                        </LikeButton>
                        <span>{conteudo.amountLikes}</span>
                        <AuthModal onSuccess={handleCurtir}/>
                    </Aside>
                    <div className="card">
                        <Article>
                            <header>
                                <h1>{conteudo.name}</h1>
                                <span>Postado em {conteudo.dataPublicacaoFormatada}</span>
                                <span>{conteudo.amountAccess} acessos</span>
                                <p>{conteudo.summary}</p>
                            </header>
                            {children}
                        </Article>
                    </div>
                    <Comments comentarios={conteudo.comentarios} idConteudo={conteudo.id}></Comments>
                    <Footer />
                </>
            )}
        </>
    );
}
