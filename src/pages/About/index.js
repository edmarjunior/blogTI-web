import React from "react";
import { Content } from "./styles";
import meuAvatar from "../../assets/me.jpg";

export default function About() {
    return (
        <div className="card">
            <Content>
                <img className="round" src={meuAvatar} alt="foto perfil edmar" />
                <strong>Edmar Costa</strong>
                <span>Software Developer at 
                    <a 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        href="https://mazzafc.tech/"
                    >
                        MazzaFC
                    </a>
                </span>
                <span>Franca, São Paulo, Brasil</span>
            </Content>
        </div>
    );
}
