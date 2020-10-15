// docs: https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp

import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor as EditorDraft } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import api from '../../services/api';
import history from '../../services/history';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function Editor() {
    const [editorState, setEditorState] = useState()

    const usuario = useSelector(state => state.usuario.perfil);

    useEffect(() => {
        const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        const contentBlock = htmlToDraft(html);
        
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const content = EditorState.createWithContent(contentState);
            setEditorState(content)
        }
    }, [])

    const add = async () => {
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        const { data: response } = await api.post(`/contents`, 
            {
                name: "Transferindo dados em Excel para MongoDB com NodeJS",
                summary: 'Neste post iremos criar uma aplicação em nodeJS para buscar dados de um arquivo xlsx e persisti-los no mongoDB',
                tags: ["node", "excel", "mongoDB"],
                content: html
            },
            {
                headers: {
                    user_id:  usuario?.id,
                }
            }
        );

        if (!response.ok) {
            toast.info(response.messages[0])
            return
        }

        toast.info('Post realizado com sucesso!');

        history.push('/posts');
    }

    return (
        <div>
            <EditorDraft
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(content) => setEditorState(content)}
            />
            <div style={{ marginTop: 15 }}>
                <button 
                    type="button" 
                    onClick={add}
                    style={{ padding: 5, background: '#4F3AB7', color: '#FFF', borderRadius: 5 }}
                >
                    Create
                </button>
            </div>
       
        </div>
    )
}
