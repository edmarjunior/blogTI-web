import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { setConteudo } from '../../../store/modules/conteudo/actions'
import { Container, FormCss } from './styles'

export default function Form() {
    const dispatch = useDispatch();
    const post = useSelector(state => state.conteudo.dados);

    function onChange(e) {
        const newPost = {
            ...post,
            [e.target.name]: e.target.value
        };

        dispatch(setConteudo(newPost));
    }

    return (
        <Container>
            <FormCss>
                <div>
                    <label htmlFor="name">Título</label>
                    <input id="name" name="name" type="text" value={post.name || ""} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="summary">Resumo</label>
                    <textarea id="summary" name="summary" cols="30" rows="8" value={post.summary || ""} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="tags">Tags (separar por espaços)</label>
                    <input id="tags" type="text" name="tags" value={post.tags || ""} onChange={onChange} />
                </div>
            </FormCss>
        </Container>
    )
}
