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
            const { data } = await api.get(`/conteudos/${idConteudo}`, {
                params: { idUsuario: usuario?.id },
                headers: {
                    Ip: responseIp.data.ip
                }
            });

            // buscando comentários
            const { comentarios } = await (await api.get(`/conteudos/${idConteudo}/comentarios`, {
                headers: {
                    user_id:  usuario?.id,
                }
            })).data;

            setConteudo({
                ...data,
                dataPublicacaoFormatada: format(parseISO(data.data_publicacao, { locale: pt }), 'dd/MM/yyyy'),
                comentarios
            });

            setLoading(false);
        }
        carregaDados();
    },[idConteudo, usuario])

    async function handleCurtir(usuarioCadastrado) {
        const usuarioLogado = usuario ?? usuarioCadastrado;

        if (conteudo.curtido) {
            toast.info('Este conteúdo já esta curtido, obrigado!');
            return;
        }
        
        if (!usuarioLogado?.email) {
            dispatch(openModal());
            return;
        }

        try {
            const response = await api.post(`/curtida-conteudo/${idConteudo}`, null, {
                headers: {
                    Authorization: `bearer ${usuarioLogado.token}`
                }
            });
    
            if (response.data.curtido_anteriormente) {
                toast.info(response.data.msg);
            } else {
                toast.info("Que bom que gostou desse conteúdo");
                setConteudo({
                    ...conteudo,
                    quantidade_curtidas: conteudo.quantidade_curtidas + 1,
                })
            }
        } catch(err) {
            toast.error("Falha ao curtir conteúdo");
        }
    }

    return (
        <>
            {loading && <Loading center="true" />}
            {!loading && (
                <>
                    <Aside>
                        <LikeButton type="button" curtido={conteudo.curtido} onClick={handleCurtir}>
                            <MdFavorite color="#ff0000" size={30} />
                        </LikeButton>
                        <span>{conteudo.quantidade_curtidas}</span>
                        <AuthModal onSuccess={handleCurtir}/>
                    </Aside>
                    <div className="card">
                        <Article>
                            <header>
                                <h1>{conteudo.titulo}</h1>
                                <span>Postado em {conteudo.dataPublicacaoFormatada}</span>
                                <span>{conteudo.quantidade_acessos} acessos</span>
                                <p>{conteudo.resumo}</p>
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
