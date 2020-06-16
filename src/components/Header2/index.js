import React from 'react';
import { MdForward} from 'react-icons/md'

import { Header, Profile, Menu} from './styles';

export default function Header2() {
 
    return (
        <>
            <Header>
                <div>
                    <div className="name">
                        <strong>EDMAR COSTA</strong>
                        <span>Conteúdos sobre T.I</span>
                    </div>
                    <Profile>
                        <div>
                            <strong>Bem vindo</strong>
                            <span>faça login <MdForward /></span>                        
                        </div>
                        <img src='https://api.adorable.io/avatars/50/abott@adorable.png' alt="avatar do usuário"/>
                    </Profile>
                </div>
            </Header>
            <Menu>
                <nav>
                    <a href="/" >Conteúdos</a>
                    <a href="/" >Sobre</a>
                </nav>
            </Menu>
        </>
    );
}