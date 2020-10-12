import React, { useEffect, useState } from 'react'
import Content from '../../_layouts/content'
import { ContainerRepository } from '../../../components/ContainerRepository/styles';
import api from '../../../services/api';

import img1 from './assets/img1.png';
import img2 from './assets/img2.png';
import img3 from './assets/img3.png';
import img4 from './assets/img4.png';
import imgExcel from './assets/imgExcel.png';

export default function SpreadsheetReader() {

    const [repo, setRepo] = useState({});

    useEffect(() => {
        async function carregaDados() {
            // api do gitHub
            const responseRepo  = await api.get('https://api.github.com/repos/edmarjunior/excel-to-mongo');
            const { name, html_url, description } = responseRepo.data;
            const { avatar_url } = responseRepo.data.owner;
            
            setRepo({
                name, 
                html_url, 
                description,
                avatar_url
            });
        }
        
        carregaDados();
    }, []);

    return (
        <Content idConteudo="5f82084b68c38e6c4e827237">
            <section>
                <h2>Criando o projeto</h2>
                <p>Crie um diretório com o nome da sua app, acesse-a e abra algum terminal</p>
                <p>Execute os comandos abaixo:</p>
                <ul>
                    <li><code>npm init -y</code> (criação do arquivo package.json)</li>
                    <li><code>npm i read-excel-file</code> (instalando a lib para leitura da planilha em excel)</li>
                    <li><code>npm i mongodb</code> (instalando o mongodb)</li>
                </ul>
            </section>
            <section>
                <h2>MongoDB (criando método para inserir dados)</h2>
                <p>Crie um arquivo db.js com o conteúdo da imagem abaixo</p>
                <div>
                    <img src={img1} alt="arquivo db.js" />
                    <ul>
                        <li><strong>Linha 1:</strong> importando o MongoClient</li>
                        <li><strong>Linha 3:</strong> declarando a função que vamos utilizar para salvar dados no mongo</li>
                        <li><strong>Linha 5:</strong> string de conexão com o mongoDB</li>
                        <li><strong>Linhas 6 e 7:</strong> nomes do banco de dados e da collection que vamos inserir os dados</li>
                        <li><strong>Linha 9:</strong> conexão com o mongoDB</li>
                        <li><strong>Linha 13:</strong> acessando o banco de dados</li>
                        <li><strong>Linha 14:</strong> acessando a collection</li>
                        <li><strong>Linha 17:</strong> inserindo os dados</li>
                        <li><strong>Linha 21:</strong> fechando a conexão</li>
                        <li><strong>Linha 25:</strong> exportando o método "insertDocuments"</li>
                    </ul>
                </div>
                <p>
                    Neste post vamos utilizar o docker para subirmos uma instância do mongoDB na máquina, para isso execute o comando abaixo:
                </p>
                <p>
                    <code>docker run --name db_excel -d -p 27017:27017 mongo</code>
                </p>
                <p>
                    Para visualizar os dados que serão inseridos no mongoDB vamos utilizar a ferramenta Robo 3-T. 
                    Dentro da interface do Robo 3-T, clique em "create", preencha o campo "Name" e clique em "Save" (conforme imagem abaixo)
                </p>
                <div>
                    <img src={img3} alt="interface do Robo 3-T" />
                </div>
                <br/>
            </section>
            <section>
                <h2>Leitura do arquivo de excel</h2>
                <p>A planilha que vamos ler possui 4 colunas (conforme imagem abaixo)</p>
                <img src={imgExcel} alt="planilha do excel" />
                <p>Crie um arquivo index.js com o conteúdo da imagem abaixo</p>
                <div>
                    <img src={img2} alt="arquivo index.js" />
                    <ul>
                        <li><strong>Linha 1:</strong> importando lib para a leitura do arquivo .xlsx</li>
                        <li><strong>Linha 2:</strong> importando o método "insertDocuments" que criamos anteriormente</li>
                        <li><strong>Linha 4:</strong> declarando a função que irá fazer a leitura e gravação dos dados.</li>
                        <li><strong>Linhas 5:</strong> executando a função passando o caminho do arquivo arquivo .xlsx, e armazenando as linhas que serão retornadas do arquivo na variavel "rows"</li>
                        <li><strong>Linha 8:</strong> removendo a primeira linha, pois neste exemplo, não preciso salvar do nome das colunas</li>
                        <li><strong>Linha 10 à 15:</strong> mapeando as linhas retornadas para a variável "access". </li>
                        <li><strong>Linha 19:</strong> chamando o método "insertDocuments" passando os dados mapeados</li>
                        <li><strong>Linha 23:</strong> chamada para execução do método "init"</li>
                    </ul>
                </div>
                <p>
                    Note que nas linhas 11 à 14, a leitura das colunas é feita pelo index da coluna, começando em 0 (zero). Exemplo: na linha 11 "row[0]" retornará o conteúdo da linha percorrida na primeira coluna
                </p>
                <p>Execute o arquivo index.js com o comando: <code>node index.js</code></p>
                <p>Pronto, agora é só conferir os dados que foram salvos acessando a interface do Robo 3-T (conforme imagem abaixo)</p>
                <div>
                    <img src={img4} alt="interface final do Robo 3-T" />
                </div>
            </section>
            <section>
                <h2>Código fonte</h2>
                <ContainerRepository>
                    <img className="round" width={100} height={100} src={repo.avatar_url} alt="avatar do proprietário do repositório"/>
                    <a target="_blank" rel="noopener noreferrer" href={repo.html_url} >{repo.name}</a>
                    <span>{repo.description}</span>
                </ContainerRepository>

                <p>Não deixe de dar sua sugestão, elogio ou aquele like <span role="img" aria-label="Piscada">😉</span></p>
                <p>Valew Galera, até a próxima!</p>
            </section>
        </Content>
    )
}