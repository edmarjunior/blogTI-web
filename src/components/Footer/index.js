import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdFavorite, MdThumbUp, MdThumbDown } from 'react-icons/md';
import { Container, Actions } from './styles';

export default function Footer() {

    return (
        <Container>
            <Actions>
                {/* <Button>Show Toast</Button> */}
                <span>O que você achou desse post?</span>
                <div>
                    <MdFavorite color="#ff0000" size={23} title="Amei" />
                    <MdThumbUp color="#220597" size={23} title="Curti" />
                    <MdThumbDown color="#000" size={23} title="Não gostei" />
                </div>
            </Actions>
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
