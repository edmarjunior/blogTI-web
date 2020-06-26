import React, { useState } from 'react';
import api from '../../services/api';

import { Conteiner, EntryComment, ContainerResponse, EntryResponse, Commented, Response } from './styles';
import { toast } from 'react-toastify';

export default function Comments({ comments: commentsParam, idConteudo }) {
    const [comments, setComments] = useState(commentsParam);
    const [valueComment, setValueComment] = useState('');
    
    const handleViewResponses = (idComentario) => {
        const comentarios = comments.map(comentario => ({
            ...comentario,
            showResponses: comentario.id === idComentario 
                ? !comentario.showResponses 
                : comentario.showResponses
        }));

        setComments(comentarios);
    }

    const handleViewEntryResponse = (idComentario) => {
        const comentarios = comments.map(comentario => ({
            ...comentario,
            showEntryResponse: comentario.id === idComentario 
                ? !comentario.showEntryResponse 
                : comentario.showEntryResponse
        }));

        setComments(comentarios);
    }

    // comment

    const onChangeComment = (event) => {
        setValueComment(event.target.value);
    }

    async function onTypeComment(event) {
        const conteudo = event.target.value.trim();

        if (event.keyCode !== 13) {
            return;
        }
       
        event.preventDefault();
        
        if (!conteudo) {
            toast.error('Escreva um comentário');
            return;
        }

        // const response = await api.post('/comentario', {
        //     id_conteudo: idConteudo,
        //     id_conteudo_pai: null,
        //     conteudo,
        // });

        // const novoComentario = response.data;

        const novoId = comments.length + 1;

        const novoComentario = {
            id: novoId,
            nome: 'João Gabriel',
            conteudo,
            quantidade_curtidas: 0,
            curtido: false,
            showResponses: false,
            showEntryResponse: false,
            novoComentario: true,
            comentarios: []
        };

        setComments([...comments, novoComentario].sort((a, b) =>  a.id > b.id ? -1 : 1 ));
        setValueComment('');
        toast.info('Obrigado pelo comentário');
    }

    // response

    const onChangeResponse = (event, commentId) => {
        const { value } = event.target;

        setComments(comments.map(comment => {
            return comment.id === commentId
                ? {
                    ...comment,
                    responseValue: value
                }
                : comment;
            
        }));
    }

    async function onTypeResponse(event, idComentarioPai) {
        const conteudo = event.target.value.trim();

        if (event.keyCode !== 13) {
            return;
        }
       
        event.preventDefault();
        
        if (!conteudo) {
            toast.error('Escreva uma resposta');
            return;
        }

        // const response = await api.post('/comentario', {
        //     id_conteudo: idConteudo,
        //     id_conteudo_pai: idComentarioPai,
        //     conteudo,
        // });

        // const novoComentario = response.data;

        const novoComentario = {
            id: 8,
            nome: 'Edmar Costa',
            conteudo,
            quantidade_curtidas: 5,
            curtido: false,
            novoComentario: true,
            new: true,
        };

        console.log(comments);

        const comentariosAtualizados = comments.map(comentario => {
            return comentario.id === idComentarioPai
                ? {
                    ...comentario,
                    responseValue: '',
                    comentarios: [novoComentario, ...comentario.comentarios]
                } 
                : comentario
        }).sort((a, b) => a.id > b.id ? -1 : 1 );

        console.log(comentariosAtualizados);

        setComments(comentariosAtualizados);
        // setValueResponse('');
        toast.info('Obrigado pela resposta');
    }

    return (
        <Conteiner>
            <div>
                <h1>Comentários</h1>
                <div>
                    <EntryComment>
                        <img className="round" width={35} height={35} 
                            src='https://api.adorable.io/avatars/50/abott@adorable.png' 
                            alt="avatar do usuário"/>
                        <textarea type="text" value={valueComment} 
                            onChange={onChangeComment} 
                            onKeyDown={onTypeComment} 
                            placeholder="Escreva um comentário..." />
                    </EntryComment>
                </div>
                {comments.map(comment => (
                    <Commented key={comment.id} new={comment.novoComentario}>
                        <img className="round" width={35} height={35} src='https://api.adorable.io/avatars/50/abott@adorable.png' alt="avatar do usuário"/>
                        <div>
                            <div>
                                <strong>{comment.nome}</strong>
                                <span>{comment.conteudo}</span>
                                <div className="options">
                                    <button>Curtir</button>
                                    <button onClick={() => handleViewEntryResponse(comment.id)}>Responder</button>
                                    {!!comment.comentarios.length && (
                                        <button onClick={() => handleViewResponses(comment.id)}>
                                            {comment.showResponses ? "Ocultar respostas" : `Ver ${comment.comentarios.length} resposta(s)`}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <ContainerResponse show={comment.showEntryResponse || comment.showResponses}>
                                <EntryResponse show={comment.showEntryResponse}>
                                    <img className="round" width={20} height={20} 
                                        src='https://api.adorable.io/avatars/50/abott@adorable.png' 
                                        alt="avatar do usuário"/>
                                    <textarea type="text" 
                                        value={comment.responseValue} 
                                        onChange={(event) => onChangeResponse(event, comment.id)} 
                                        onKeyDown={(event) => onTypeResponse(event, comment.id)} 
                                        placeholder="Escreva uma resposta..." />
                                </EntryResponse>
                                <Response show={comment.showResponses}>
                                    {comment.comentarios.map(response => (
                                        <div key={response.id} className="response">
                                            <img className="round" width={20} height={20} src='https://api.adorable.io/avatars/50/abott@adorable.png' alt="avatar do usuário"/>
                                            <div className={response.new ? "new-response" : ""}>
                                                <strong>{response.nome}</strong>
                                                <span>{response.conteudo}</span>
                                            </div>
                                        </div>
                                    ))}
                                </Response>
                                
                            </ContainerResponse>
                        </div>
                   </Commented>
                ))}
            </div>
        </Conteiner>
    );
}
