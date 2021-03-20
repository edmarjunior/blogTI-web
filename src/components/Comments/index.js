import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import api from '../../services/api';
import { Modal, Button } from 'react-bootstrap';
import GoogleLogin from "react-google-login";
import { MdAccountCircle } from 'react-icons/md';

import { createUsuario } from "../../store/modules/usuario/actions";
import { toast } from 'react-toastify';

import { Conteiner, EntryComment, ContainerResponse, EntryResponse, Commented, Response } from './styles';

export default function Comments({ comentarios: comentariosParam, idConteudo }) {
    const dispatch = useDispatch();
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const usuario = useSelector(state => state.usuario.perfil);
    const avatarUrl = usuario?.avatarUrl;

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
        const { data: response} = await api.post('comments', 
            {
                topCommentId: idComentarioSuperior,
                contentId: idConteudo,
                description: descricao,
            },
            {
                headers: {
                    Authorization: `bearer ${usuarioLogado.accessToken}`
                }
            }
        );

        if (!response.ok) {
            toast.info(response.messages[0]);
            return;
        }

        console.log({ usuarioLogado, isComentario })

        if (isComentario) {
            setComentarios([
                {
                    ...response.content,
                    exibirRespostas: true,
                    novo: true,
                    allowEdit: true,
                    user: {
                        name: usuarioLogado.name,
                        avatarUrl: usuarioLogado.avatarUrl,
                    },
                    answers: [],
                },
                ...comentarios, 
            ]);
    
            setDescricaoComentario('');
    
            toast.info('Comentário feito!', { position: 'bottom-right' });

            return;
        }

        // resposta
        const respostaCadastrada = {
            ...response.content,
            novo: true,
            allowEdit: true,
            user: {
                name: usuarioLogado.name,
                avatarUrl: usuarioLogado.avatarUrl,
            }
        }

        setComentarios(comentarios.map(comentario => {
            return comentario.id === idComentarioSuperior
                ? {
                    ...comentario,
                    responseValue: '',
                    exibirRespostas: true,
                    answers: [respostaCadastrada, ...comentario.answers]
                } 
                : comentario
        }));

        toast.info('Resposta cadastrada!', { position: 'bottom-right' });
    }

    async function editarComentario({ id, descricao, usuarioLogado, isComentario }) {
        const { data: response } = await api.put(`/comments/${id}`, 
            { 
                description: descricao 
            }, 
            {
            headers: {
                Authorization: `bearer ${usuarioLogado.accessToken}`
            }
        });

        if (!response.ok) {
            toast.info(response.messages[0]);
            return;
        }

        const camposAtualizados = {
            description: descricao,
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
                    answers: comentario.answers.map(resposta => {
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
        const { email, name, imageUrl: avatarUrl } = responseAuth.profileObj;

        const { data: response } = await api.post('/users', { 
            email, 
            name, 
            avatarUrl 
        });

        if (!response.ok) {
            toast.info(response.messages[0]);
            return;
        }

        const usuario = response.content;

        dispatch(createUsuario(usuario));

        setShowAuthModal(false);

        toast.info(`Bem vindo ${name}`, { position: 'bottom-right' });

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
                        {!avatarUrl && <MdAccountCircle size={35} /> }
                        {!!avatarUrl && (
                            <img className="round" width={35} height={35} 
                                src={avatarUrl} 
                                alt="avatar do usuário"
                            />
                        )}
                        <textarea type="text" value={descricaoComentario} 
                            onChange={onChangeComment} 
                            onKeyDown={onTypeComment} 
                            placeholder="Escreva um comentário..." 
                        />
                    </EntryComment>
                </div>
                {comentarios.map(comentario => (
                    <Commented key={comentario.id} new={comentario.novo}>
                        {!comentario.user.avatarUrl && <MdAccountCircle size={35} />}
                        {comentario.user.avatarUrl && (
                            <img className="round" width={35} height={35} 
                                src={comentario.user.avatarUrl} 
                                alt="avatar do usuário"
                            />
                        )}
                        <div>
                            <div>
                                <strong>{comentario.user.name}</strong>
                                <span>{comentario.description}</span>
                                <div className="options">
                                    {comentario.allowEdit && (
                                        <button type="button" className="btn-action" 
                                            onClick={() => handleEditarComentario(comentario.id, comentario.description)}>
                                            Editar
                                        </button>
                                    )}
                                    {/* {!comentario.allowEdit && (
                                        <button type="button" className="btn-action">Curtir</button>
                                    )} */}
                                    <button type="button" className="btn-action" onClick={() => handleViewEntryResponse(comentario.id)}>
                                        Responder
                                    </button>
                                    {!!comentario.answers.length && (
                                        <button type="button" className="btn-action" onClick={() => handleViewResponses(comentario.id)}>
                                            {comentario.exibirRespostas ? "Ocultar respostas" : `Ver ${comentario.answers.length} resposta(s)`}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <ContainerResponse show={comentario.showEntryResponse || comentario.exibirRespostas}>
                                <EntryResponse show={comentario.showEntryResponse}>
                                    {!avatarUrl && <MdAccountCircle size={20} />}
                                    {!!avatarUrl && (
                                        <img className="round" width={20} height={20} 
                                            src={avatarUrl} 
                                            alt="avatar do usuário"
                                        />
                                    )}
                                    <textarea type="text"
                                        value={comentario.responseValue} 
                                        onChange={(event) => onChangeResponse(event, comentario.id)} 
                                        onKeyDown={(event) => onTypeResponse(event, comentario.id, comentario.editandoComentarioId, comentario.editandoRespostaId)} 
                                        placeholder={comentario.editando ? "Você está editando o seu comentário acima" : "Escreva uma resposta..."} 
                                    />
                                </EntryResponse>
                                <Response show={comentario.exibirRespostas}>
                                    {comentario.answers.map(resposta => (
                                        <div key={resposta.id}>
                                            {!resposta.user.avatarUrl && <MdAccountCircle size={20} />}
                                            {!!resposta.user.avatarUrl && (
                                                <img className="round" width={20} height={20} 
                                                    src={resposta.user.avatarUrl} 
                                                    alt="avatar do usuário"
                                                />
                                            )}
                                            
                                            <div className={resposta.novo ? "new-response" : ""}>
                                                <strong>{resposta.user.name}</strong>
                                                <span>{resposta.description}</span>
                                            </div>
                                            {resposta.allowEdit && (
                                                <button type="button" className="btn-action"
                                                    onClick={() => handleEditarResposta(comentario.id, resposta.id, resposta.description)}>
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
