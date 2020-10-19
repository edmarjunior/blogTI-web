import React from 'react';

import { Container } from './styles'

export default function Unauthorized() {
    return (
        <Container>
            <h1>Usuário sem permissão</h1>
            <p>Você não possui permissão para acessar essa funcionalidade :/</p>
        </Container>
    )
}
