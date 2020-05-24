import React from 'react';
import { Link } from "react-router-dom";
import { MdMenu } from 'react-icons/md';

import { Container, Content, LinkTitulo, Menu } from './styles';

export default function Header() {
    return (
        <Container>
            <Content>
                <nav>
                    <LinkTitulo to="/content/cli">edmar.costa | Blog sobre Tecnologia</LinkTitulo>
                </nav>
                <nav>
                    <Menu>
                        {/* <li>
                            <Link to="/">Inicio</Link>
                        </li> */}
                        <li>
                            <Link to="/content/cli">CLI</Link>  
                        </li>
                        
                        {/* <li>
                            <Link to="/">Sobre</Link>
                        </li> */}
                    </Menu>
                </nav>
            </Content>
            
        </Container>
    )
}
