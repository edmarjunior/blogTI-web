// docs: https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp

import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor as EditorDraft } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import { useLocation } from "react-router-dom";
import { FaRegSave } from 'react-icons/fa';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { toast } from 'react-toastify';

import api from '../../services/api';
import history from '../../services/history';
import { setConteudo } from '../../store/modules/conteudo/actions'
import Unauthorized from '../Unauthorized'
import { ContainerForm, SaveButton } from './styles';
import Form from './Form'

export default function Editor() {
    const dispatch = useDispatch();
    const location = useLocation();
    const usuario = useSelector(state => state.usuario.perfil);
    const post = useSelector(state => state.conteudo.dados);

    const [editorState, setEditorState] = useState()

    const loadPost = useCallback(async (id) => {
        const { data: response } = await api.get(`contents/${id}`, {
            headers: {
                user_id:  usuario?.id,
            }
        });

        if (!response.ok) {
            toast.info(response.messages[0]);
            return null;
        }

        dispatch(setConteudo(response.content))

        return response.content;
    }, [dispatch, usuario])

    useEffect(() => {
        async function init() {
            const postId = location.state?.postId;

            let html;

            if (postId) {
                const post = await loadPost(postId);
                html = post.content;
            } else {
                html = '<p>Bem vindo, hoje vamos criar nosso <strong>melhor</strong> post! 😀</p>'
            }

            const contentBlock = htmlToDraft(html);
            
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const content = EditorState.createWithContent(contentState);
                setEditorState(content)
            }
        }

        dispatch(setConteudo({}))

        init();
    }, [dispatch, loadPost, location.state, usuario])

    const add = async (newPost) => {
        const { data: response } = await api.post(`contents`, newPost, {
            headers: {
                Authorization: `bearer ${usuario.accessToken}`
            }
        });

        if (!response.ok) {
            toast.info(response.messages[0]);
            return;
        }

        toast.info('Post realizado com sucesso!');

        history.push('/posts');
    }

    const edit = async (newPost) => {
        const { data: response } = await api.put(`contents/${post.id}`, newPost, {
            headers: {
                Authorization: `bearer ${usuario.accessToken}`
            }
        });

        if (!response.ok) {
            toast.info(response.messages[0]);
            return;
        }

        toast.info('Post realizado com sucesso!');

        history.push('/posts');
    }

    const save = async () => {
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        const newPost = {
            ...post,
            content: html
        };

        dispatch(setConteudo(newPost))

        if (post.id) {
            return await edit(newPost);
        }
        
        await add(newPost)
    }

    return !usuario?.isAdm ?? false
        ? <Unauthorized />
        : (
            <>
                <div className="card">
                    <EditorDraft
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={(content) => setEditorState(content)}
                    />
                </div>

                <ContainerForm>
                    <Form />
                </ContainerForm>

                <SaveButton title="Salvar post" onClick={save}>
                    <FaRegSave color="#4F3AB7" size={40} />
                </SaveButton>
            </>
        )
}
