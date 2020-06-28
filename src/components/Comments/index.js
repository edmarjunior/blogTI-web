import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import api from '../../services/api';
import { Modal, Button } from 'react-bootstrap';
import GoogleLogin from "react-google-login";

import { createUsuario } from "../../store/modules/usuario/actions";
import { toast } from 'react-toastify';

import { Conteiner, EntryComment, ContainerResponse, EntryResponse, Commented, Response } from './styles';

export default function Comments({ comentarios: comentariosParam, idConteudo }) {
    const dispatch = useDispatch();
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const usuario = useSelector(state => state.usuario.perfil);
    const avatar_url = usuario?.avatar_url ?? 'https://api.adorable.io/avatars/50/abott@adorable.png';

    const [comentarios, setComentarios] = useState(comentariosParam);
    const [descricaoComentario, setDescricaoComentario] = useState('');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [parametros, setParametros] = useState({});

    const handleViewResponses = (idComentario) => {
        setComentarios(comentarios.map(comentario => ({
            ...comentario,
            exibirRespostas: comentario.id === idComentario 
                ? !comentario.exibirRespostas 
                : comentario.exibirRespostas
        })));
    }

    const handleViewEntryResponse = (idComentario) => {
        setComentarios(comentarios.map(comentario => {
            return comentario.id === idComentario
                ? {
                    ...comentario,
                    showEntryResponse: comentario.editando || !comentario.showEntryResponse,
                    editando: false,
                    editandoComentarioId: null,
                    editandoRespostaId: null,
                    responseValue: '',
                }
                : comentario
        }));
    }

    // comentários

    const onChangeComment = (event) => {
        setDescricaoComentario(event.target.value);
    }

    async function onTypeComment(event) {
        const descricao = event.target.value.trim();

        if (event.keyCode !== 13) {
            return;
        }
       
        event.preventDefault();
        
        if (!descricao) {
            toast.error('Escreva um comentário', { position: 'bottom-right' });
            return;
        }

        if (!usuario?.email) {
            setParametros({
                isComentario: true, 
                descricao, 
                idComentarioSuperior: null,
            });

            setShowAuthModal(true);

            return;
        }
        
        criarComentario({
            isComentario: true,
            descricao,
            idComentarioSuperior: null,
            usuarioLogado: usuario,
        });
    }

    async function criarComentario({ isComentario, descricao, idComentarioSuperior, usuarioLogado }) {
        const response = await api.post(`conteudos/${idConteudo}/comentarios`, 
            {
                descricao,
                id_comentario_superior: idComentarioSuperior,
            },
            {
                headers: {
                    Authorization: `bearer ${usuarioLogado.token}`
                }
            }
        );

        if (isComentario) {
            setComentarios([
                {
                    ...response.data,
                    exibirRespostas: true,
                    novo: true,
                    permite_editar: true,
                    usuario: {
                        nome: usuarioLogado.nome,
                        avatar_url: usuarioLogado.avatar_url,
                    },
                    respostas: [],
                },
                ...comentarios, 
            ]);
    
            setDescricaoComentario('');
    
            toast.info('Comentário feito!', { position: 'bottom-right' });

            return;
        }

        // resposta
        const respostaCadastrada = {
            ...response.data,
            novo: true,
            permite_editar: true,
            usuario: {
                nome: usuarioLogado.nome,
                avatar_url: usuarioLogado.avatar_url,
            }
        }

        setComentarios(comentarios.map(comentario => {
            return comentario.id === idComentarioSuperior
                ? {
                    ...comentario,
                    responseValue: '',
                    exibirRespostas: true,
                    respostas: [respostaCadastrada, ...comentario.respostas]
                } 
                : comentario
        }));

        toast.info('Resposta cadastrada!', { position: 'bottom-right' });
    }

    async function editarComentario({ id, descricao, usuarioLogado, isComentario }) {
        await api.put(`comentarios/${id}`, { descricao}, {
            headers: {
                Authorization: `bearer ${usuarioLogado.token}`
            }
        });

        const camposAtualizados = {
            descricao,
            novo: true,
            responseValue: '',
            editando: false,
            editandoComentarioId: null,
            editandoRespostaId: null,
        }

        if (isComentario) {
            setComentarios(comentarios.map(comentario => {
                return comentario.id === id
                    ? {
                        ...comentario,
                        ...camposAtualizados,
                    }
                    : comentario;
            }));

            toast.info('Editado com sucesso!', { position: 'bottom-right' });

            return;
        }

        setComentarios(comentarios.map(comentario => {
            return {
                    ...comentario,
                    responseValue: '',
                    editandoRespostaId: null,
                    editando: false,
                    respostas: comentario.respostas.map(resposta => {
                        return resposta.id === id
                            ? {
                                ...resposta,
                                ...camposAtualizados,
                            }
                            : resposta
                    })
                }
        }));

        toast.info('Editado com sucesso!', { position: 'bottom-right' });
    }

    const handleEditarComentario = async (idComentario, descricao) => {
        setComentarios(comentarios.map(comentario => {
            return comentario.id === idComentario
                ? {
                    ...comentario,
                    showEntryResponse: true,
                    responseValue: descricao,
                    editandoComentarioId: comentario.id,
                    editando: true,
                }
                : comentario
        }));
    }

    const handleEditarResposta = async (idComentario, idResposta, descricao) => {
        setComentarios(comentarios.map(comentario => {
            return comentario.id === idComentario
                ? {
                    ...comentario,
                    showEntryResponse: true,
                    responseValue: descricao,
                    editandoRespostaId: idResposta,
                    editando: true,
                }
                : comentario
        }));
    }

    // respostas

    const onChangeResponse = (event, commentId) => {
        const { value } = event.target;

        setComentarios(comentarios.map(comentario => {
            return comentario.id === commentId
                ? {
                    ...comentario,
                    responseValue: value,
                }
                : comentario;
            
        }));
    }

    async function onTypeResponse(event, idComentarioSuperior, editandoComentarioId, editandoRespostaId) {
        const descricao = event.target.value.trim();

        if (event.keyCode !== 13) {
            return;
        }
       
        event.preventDefault();

        if (!descricao) {
            toast.error('Escreva algum comentário', { position: 'bottom-right' });
            return;
        }

        const params = {
            isComentario: false, 
            descricao, 
            idComentarioSuperior,
            editandoComentarioId,
            editandoRespostaId
        };

        if (!usuario?.email) {
            setParametros(params);
            setShowAuthModal(true);
            return;
        }

        if (editandoComentarioId || editandoRespostaId) {
            editarComentario({
                id: editandoComentarioId ?? editandoRespostaId,
                descricao,
                usuarioLogado: usuario,
                isComentario: !!editandoComentarioId,
            });

            return;
        }

        criarComentario({
            ...params,
            usuarioLogado: usuario,
        });
    }

    // autenticação

    async function onSuccessAuthLogin(responseAuth) {
        const { email, name: nome, imageUrl: avatar_url } = responseAuth.profileObj;

        const response = await api.post('/usuarios', { 
            email, 
            nome, 
            avatar_url 
        });

        const usuario = response.data;

        dispatch(createUsuario(usuario));

        setShowAuthModal(false);

        toast.info(`Bem vindo ${nome}`, { position: 'bottom-right' });

        if (parametros.editandoComentarioId || parametros.editandoRespostaId) {
            editarComentario({
                id: parametros.editandoComentarioId ?? parametros.editandoRespostaId,
                descricao: parametros.descricao,
                usuarioLogado: usuario,
                isComentario: !!parametros.editandoComentarioId,
            });
            
            return;
        }

        criarComentario({
            ...parametros, 
            usuarioLogado: usuario 
        });
    }

    function onFailureAuth() {
        toast.error('Desculpe! tivemos um erro com nosso login social, por favor tente mais tarde', { position: 'bottom-right' });
    }

    return (
        <Conteiner>
            <div>
                <h1>Comentários</h1>
                <div>
                    <EntryComment>
                        <img className="round" width={35} height={35} 
                            src={avatar_url} 
                            alt="avatar do usuário"
                        />
                        <textarea type="text" value={descricaoComentario} 
                            onChange={onChangeComment} 
                            onKeyDown={onTypeComment} 
                            placeholder="Escreva um comentário..." 
                        />
                    </EntryComment>
                </div>
                {comentarios.map(comentario => (
                    <Commented key={comentario.id} new={comentario.novo}>
                        <img className="round" width={35} height={35} 
                            src={comentario.usuario.avatar_url ?? 'https://api.adorable.io/avatars/50/abott@adorable.png'} 
                            alt="avatar do usuário"
                        />
                        <div>
                            <div>
                                <strong>{comentario.usuario.nome}</strong>
                                <span>{comentario.descricao}</span>
                                <div className="options">
                                    {comentario.permite_editar && (
                                        <button type="button" className="btn-action" 
                                            onClick={() => handleEditarComentario(comentario.id, comentario.descricao)}>
                                            Editar
                                        </button>
                                    )}
                                    {/* {!comentario.permite_editar && (
                                        <button type="button" className="btn-action">Curtir</button>
                                    )} */}
                                    <button type="button" className="btn-action" onClick={() => handleViewEntryResponse(comentario.id)}>
                                        Responder
                                    </button>
                                    {!!comentario.respostas.length && (
                                        <button type="button" className="btn-action" onClick={() => handleViewResponses(comentario.id)}>
                                            {comentario.exibirRespostas ? "Ocultar respostas" : `Ver ${comentario.respostas.length} resposta(s)`}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <ContainerResponse show={comentario.showEntryResponse || comentario.exibirRespostas}>
                                <EntryResponse show={comentario.showEntryResponse}>
                                    <img className="round" width={20} height={20} 
                                        src={avatar_url} 
                                        alt="avatar do usuário"
                                    />
                                    <textarea type="text"
                                        value={comentario.responseValue} 
                                        onChange={(event) => onChangeResponse(event, comentario.id)} 
                                        onKeyDown={(event) => onTypeResponse(event, comentario.id, comentario.editandoComentarioId, comentario.editandoRespostaId)} 
                                        placeholder={comentario.editando ? "Você está editando o seu comentário acima" : "Escreva uma resposta..."} 
                                    />
                                </EntryResponse>
                                <Response show={comentario.exibirRespostas}>
                                    {comentario.respostas.map(resposta => (
                                        <div key={resposta.id}>
                                            <img className="round" width={20} height={20} 
                                                src={resposta.usuario.avatar_url ?? 'https://api.adorable.io/avatars/50/abott@adorable.png'} 
                                                alt="avatar do usuário"
                                            />
                                            <div className={resposta.novo ? "new-response" : ""}>
                                                <strong>{resposta.usuario.nome}</strong>
                                                <span>{resposta.descricao}</span>
                                            </div>
                                            {resposta.permite_editar && (
                                                <button type="button" className="btn-action"
                                                    onClick={() => handleEditarResposta(comentario.id, resposta.id, resposta.descricao)}>
                                                    Editar
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </Response>
                                
                            </ContainerResponse>
                        </div>
                   </Commented>
                ))}
            </div>
            {!usuario && (
                <Modal show={showAuthModal} onHide={() => setShowAuthModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login social</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                                onSuccess={onSuccessAuthLogin}
                                onFailure={onFailureAuth} >
                            </GoogleLogin>
                        </div>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAuthModal(false)}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}                            
        </Conteiner>
    );
}
