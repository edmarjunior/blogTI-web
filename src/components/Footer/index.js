import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { Container } from './styles';

export default function Footer() {

    const periodo = 2020 + '-' + new Date().getFullYear();

    return (
        <Container>
            <div className="content">
                <div>
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/edmarjunior" title="GitHub">
                        <FaGithub size={30} color="#fff"/>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/edmar-costa-4087a1133/" title="Linkedin">
                        <FaLinkedin size={30} color="#fff" />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/junin.costa.96" title="Linkedin">
                        <FaFacebook size={30} color="#fff" />
                    </a>
                </div>
                <div>
                    <span className="info">{periodo} edmarcosta.site - Conteúdos sobre tecnologia, programação e afins.</span>
                </div>
            </div>
        </Container>
    )
}
