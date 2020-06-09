import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Container } from './styles';

export default function Footer() {

    return (
        <Container>
            <div>
                <a href="https://github.com/edmarjunior" title="GitHub" target="_blank">
                    <FaGithub size={30} color="#000"/>
                </a>
                <a href="https://www.linkedin.com/in/edmar-costa-4087a1133/" target="_blank" title="Linkedin">
                    <FaLinkedin size={30} color="#220597" />
                </a>
            </div>

            
        </Container>
    )
}
