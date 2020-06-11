import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdForward} from 'react-icons/md'

import { Container, Content, Navigation, Profile} from './styles';

export default function Header() {
    const usuario = useSelector(state => state.usuario.perfil);

    return (
        <Container>
            <Content>
                <Navigation>
                    <Link to="/content/cli"></Link>
                    <span>Como criar uma CLI em Node.js</span>
                </Navigation>
                <Profile>
                    <div>
                        <strong>{usuario?.nome ?? 'Bem vindo'}</strong>
                        {usuario?.email && <span>{usuario.email}</span>}
                        {!usuario?.email && <span>faça login por aqui <MdForward /></span>}
                    </div>
                    <img src='https://api.adorable.io/avatars/50/abott@adorable.png' alt="avatar do usuário"/>
                </Profile>
            </Content>
        </Container>
    )
}
