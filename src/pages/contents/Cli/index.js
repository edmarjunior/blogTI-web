import React, { useState, useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';
import api from '../../../services/api';

import { Container, Paragraph, ListImage, ContainerRepository, Dedication } from './styles';
import img1 from './assets/img1.png';
import img2 from './assets/img2.png';
import img3 from './assets/img3.png';
import img4 from './assets/img4.png';
import img5 from './assets/img5.png';
import img6 from './assets/img6.png';
import img7 from './assets/img7.png';
import img8 from './assets/img8.png';
import img9 from './assets/img9.png';
import img10 from './assets/img10.png';
import img11 from './assets/img11.png';
import img12 from './assets/img12.png';
import img13 from './assets/img13.png';
import img14 from './assets/img14.png';
import img15 from './assets/img15.png';
import img16 from './assets/img16.png';

export default function Cli() {

    const [conteudo, setConteudo] = useState({});
    const [repo, setRepo] = useState({});

    useEffect(() => {
        async function getRepo() {

            const responseRepo  = await api.get('https://api.github.com/repos/edmarjunior/calculadora-cli');

            const responseIp = await api.get('https://api.ipify.org/?format=json');

            console.log(responseIp);

            api.defaults.headers.common['Ip'] = responseIp.data.ip;

            const responseConteudo = await api.get('/conteudos/1');

            const { name, html_url, description } = responseRepo.data;
            const { avatar_url } = responseRepo.data.owner;

            setConteudo(responseConteudo.data);

            setRepo(
            {
                name, 
                html_url, 
                description,
                avatar_url
            });
        }
        
        getRepo();

    }, []);


    return (
        <Container>
            <header>
                <h1>{conteudo.titulo}</h1>
                <span>Postado em 24/05/2020</span>
            </header>
            <div>
                <p>
                    Neste post irei abordar como criar uma CLI (interface de linha de comando) em node.js, o conteúdo será para iniciante no assunto, nossa aplicação será bem simples, 
                    porém servirá de base para entendermos alguns conceitos. Em futuros post's, pretendo criar uma outra CLI com uma utilidade mais aplicável na concepção de novos projetos.
                </p>
            </div>
            <div>
                <h2>Breve explicação sobre CLI</h2>
                <Paragraph>
                    CLI nada mais é do que uma aplicação (como outra qualquer) com a diferença em que ela é construída para rodar dentro de um terminal de linha de comando, ou seja, 
                    sem interface gráfica. Podemos pegar o exemplo da calculadora do Windows, que é uma aplicação feita para desktops, e nesse post vamos fazer uma para rodar somente 
                    através de linha de comando, a intenção é abrir o terminal e digitar “calculadora soma 1 3” e obter o resultado 4.
                </Paragraph>
            </div>
            <div>
                <h2>Iniciando a criação da CLI de calculadora</h2>
                <Paragraph>
                    Primeiramente vamos criar a estrutura da nossa CLI, crie uma pasta (com nome e local que desejar) e rode o comando “npm init -y” para criar o arquivo package.json.
                </Paragraph>
                <img src={img1} alt="criação do arquivo package.json" />

                <Paragraph>
                    Observe que o comando “npm init -y” é uma CLI que cria pra gente o arquivo package.json automaticamente, agilizando nossa vida! Caso essa CLI não tivesse 
                    sido utilizada, teríamos que criar esse arquivo e todo seu conteúdo manualmente.
                </Paragraph>
                <Paragraph>
                    Abra a pasta criada com seu editor de código preferido, como vou utilizar o VS Code, é só executar no terminal o comando “code .” 
                    (observe que esse comando também é uma CLI, sua função é abrir o VS Code para a gente, e como passamos o parâmetro “.” (ponto), estamos instruindo a 
                    CLI para abrir o VS dentro do diretório atual que está sendo executado 😉)
                </Paragraph>
                <ListImage>
                    <img src={img2} alt="comando para abertura do VS code" />
                    <img src={img3} alt="vs code aberto" />
                </ListImage>
            </div>
            <div>
                <h2>Pausa para reflexão</h2>
                <Paragraph>
                    Até aqui, podemos observar a importância das CLI’s referente a agilidade na execução de tarefas, elas são poderosas aplicações e podem ser desenvolvidas 
                    para diversas utilidades, seja para criar arquivos de configuração “npm init -y”, para executar aplicações “code .”, executar nossa calculadora que estamos 
                    criando “calc soma 1 3”, enfim existe uma infinidade de aplicabilidade.
                </Paragraph>
            </div>
            <div>
                <h2>Continuando nossa CLI</h2>
                <Paragraph>
                    Vamos criar um arquivo “calc.js”, à princípio terá somente com a função “soma”, para testarmos podemos executar o arquivo com o comando “node calc.js”, 
                    e veremos o resultado 7, com isso a função principal e única da nossa calculadora está pronta.
                </Paragraph>
                <img src={img4} alt="executando o arquivo calc.js" />
                <Paragraph>
                    O próximo passo é alteramos a chamada e configurações da nossa aplicação, na imagem acima estamos executando o arquivo calc.js com o comando “node calc.js”, 
                    entretanto, como eu disse lá no inicio do post, a intenção é digitar o comando “calculadora soma 1 3”, onde “calculadora” será o nome da nossa CLI, “soma” 
                    será a action (ação) que será disparada e “1” e “3” será os parâmetros enviados para a ação.
                </Paragraph>
            </div>
            <div>
                <h2>Alterando o package.json</h2>
                <Paragraph>
                    Vamos incluir os dois comandos abaixo no nosso arquivo package.json, o primeiro comando é para instruir a instalação da nossa aplicação de forma global, 
                    e o segundo é para direcionar o comando “calculadora” (que será executado no terminal) para nosso arquivo “calc.js”.
                </Paragraph>
                <img src={img5} alt="alterando o arquivo package.json" />
                <Paragraph>
                    O próximo passo é alterar nosso arquivo “calc.js” para instrui-lo a ser executado com o node, para isso é só inserir na linha 1 o comando destacado abaixo.
                </Paragraph>
                <img src={img6} alt="alterando o arquivo package.json" />
                <Paragraph>
                    Nesse ponto, se já tentarmos rodar nossa CLI ainda não dará certo, pois ainda não a instalamos na nossa máquina, aparecerá uma mensagem parecida com a abaixo:
                </Paragraph>
                <img src={img7} alt="comando não encontrado" />
                <Paragraph>
                    Para instalar nossa CLI, vamos utilizar o comando “npm link”, com isso nossa aplicação estará instalada globalmente na nossa máquina.
                </Paragraph>
                <img src={img8} alt="comando npm link" />
                <Paragraph>
                Agora sim, digitando o comando “calculadora” (definido no package.json) nossa CLI já será executada exibindo o valor 7 (resultado do cálculo da soma) 😊.
                </Paragraph>
                <img src={img9} alt="comando calculadora" />
            </div> <div>
                <h2>Passando parâmetros</h2>
                <Paragraph>
                    Se executarmos nosso comando “calculadora” passando os argumentos 5 6, exemplo: “calculadora 5 6” podemos recuperar esse argumentos dentro do 
                    nosso arquivo “calc.js” com o “process.argv”, vamos alterar nosso arquivo (incluindo a linha 11 da imagem abaixo) para exibir o conteúdo dessa variável 
                    que é uma matriz.
                </Paragraph>
                <img src={img10} alt="exibindo o conteudo da matriz de argumentos" />
                <Paragraph>
                    Após incluído a linha acima, execute novamente a CLI passando os dois argumentos “5” e “6” (conforme imagem abaixo) para vermos o conteúdo na matriz:
                </Paragraph>
                <img src={img11} alt="conteúdo da matriz de argumentos" />
                <Paragraph>
                    Observe que a matriz possui 4 itens, onde os dois primeiros se referem a forma de como o script foi executado e o caminho do arquivo que foi executado, 
                    e os outros dois são os argumentos que passamos via terminal com o comando “calculadora 5 6”. Pronto agora já aprendemos como capturar os argumentos enviados 😉
                </Paragraph>
                <Paragraph>
                    Agora que já sabemos como capturar os argumentos, vamos alterar nosso arquivo “calc.js” para capturar os argumentos e passa-los para função que 
                    realiza a soma, conforme imagem abaixo:
                </Paragraph>
                <img src={img12} alt="recuperando os argumentos e passando para a função" />
                <Paragraph>
                    Observe que tive que utilizar o operador “+” (nas linhas 9 e 10) para converter os argumentos para números, pois como vimos, a matriz “argv” armazena 
                    somente string, se você não converter os argumentos, o resultado da soma abaixo seria “56” (pois a função soma iria fazer uma concatenação ao em vez 
                    de 11 que seria a soma) 😊
                </Paragraph>
                <img src={img13} alt="comando calculadora passando os argumentos 5 6" />
                <Paragraph>
                    Com isso nossa CLI está quase pronta. Lembra que nossa intenção é digitar o comando “calculadora soma 1 3”, então, está faltando o “soma”, que é a nossa ação, 
                    não dá pra chamar apenas “calculadora 1 3”, pois o usuário que utilizar essa CLI não saberá que será realizado uma soma, e também se quiséssemos implementar 
                    outras ações como subtração, multiplicação, divisão, etc. seria necessário incluir no comando qual ação o usuário deseja, para isso vamos utilizar o Commander.
                </Paragraph>
            </div> 
            <div>
                <h2>Implementando o Commander</h2>
                <Paragraph>
                    O comander basicamente é um pacote disponível para baixar no npm, com ele nos conseguiremos enviar nossa ação de soma e escuta-la dentro do nosso 
                    arquivo “calc.js”, então vamos lá.
                </Paragraph>
                <Paragraph>
                    Primeiramente vamos instalar o pacote do commander usando o npm
                </Paragraph>
                <img src={img14} alt="instalação do commander" />
                <Paragraph>
                    Agora vamos alterar nosso arquivo “calc.js” para ficar igual a imagem abaixo:
                </Paragraph>
                <img src={img15} alt="estrutura para o commander" />
                <ul>
                    <li>
                        <strong>Linha 3:</strong>  estamos importando o ‘commander’ que acabamos de instalar
                    </li>
                    <li>
                        <strong>Linha 6:</strong> estamos definindo um comando para escutar nossa ação, observe que na string passada como argumento estamos dizendo qual é o comando 
                        e os argumentos “x” e “y” que são obrigatórios por estarem envolvidos por “&lt;&gt;”, caso eles fossem opcionais deveriam estar envolvidos por “[]”
                    </li>
                    <li>
                        <strong>Linha 7:</strong> estamos definindo uma ação a ser tomada quando o usuário executar o comando da linha 6, a ação é justamente nossa função “soma” que 
                        foi transferida para dentro da “action”.
                    </li>
                    <li>
                        <strong>Linha 8:</strong> tivemos que alterar a função para converter as variáveis “x” e “y” (colocando o operador “+” antes de cada uma)
                    </li>
                    <li>
                        <strong>Linha 12:</strong> essa linha é necessária para que o “commander” consiga ler os argumentos que o usuário que enviar.
                    </li>
                </ul>
                <Paragraph>
                    Agora se você executar o comando “calculadora soma 1 3” terá o resultado “4”, assim como esperávamos.
                </Paragraph>
                <img src={img16} alt="comando calculadora soma 1 3" />
                <Paragraph>
                    Com isso chegamos ao fim da criação da nossa CLI. 👏👏👏
                </Paragraph>
            </div> 
            <div>
                <h2>Publicando no NPM</h2>
                <Paragraph>
                    Para que outras pessoas possa utilizar nossa CLI vamos publicada no NPM, primeiramente temos que alterar o nome da nossa CLI 
                    (localizado na propriedade “name” do arquivo “package.json”) para um nome disponível no npm, para isso podemos procurar em 
                    https://www.npmjs.com/package/nome_da_sua_cli, se ainda não existir nenhum pacote com esse nome, então podemos seguir com ele.
                </Paragraph>
                <Paragraph>
                    Com o nome definido, agora é só seguir os passos abaixo:
                </Paragraph>
                <ul>
                    <li>
                        Criar uma conta no <a href="https://www.npmjs.com/">NPM</a>
                    </li>
                    <li>
                        Executar no terminal o comando <code>npm login</code> e fazer o login com o usuário e senha criado
                    </li>
                    <li>
                        Executar no terminal (dentro da pasta da nossa CLI) o comando <code>npm publish</code>
                    </li>
                </ul>
                <Paragraph>
                    Pronto nossa CLI agora está disponível para qualquer pessoa que queira utilizar, para testarmos podemos voltar ao site do npm e 
                    verificar que nosso pacote já estará visível juntamente com o comando para instala-lo.
                </Paragraph>
            </div>
            <div>
                <h2>Finalizando</h2>
                <Paragraph>
                    Com isso finalizamos esse post, espero ter ajudado com algum conhecimento.
                </Paragraph>
                <Paragraph>
                    O conteúdo da nossa aplicação está disponivel no repositório abaixo
                </Paragraph>
                <ContainerRepository>
                    <img src={repo.avatar_url} alt="avatar do proprietário do repositório"/>
                    <a href={repo.html_url} target="_blank">{repo.name}</a>
                    <span>{repo.description}</span>
                </ContainerRepository>
                <Paragraph>
                    Até a próxima, valeu galera!
                </Paragraph>
                
            </div>
            <Dedication>
                <span>Dedico este post à <strong>Tábata Costa</strong></span> 
                <MdFavorite color="#ff0000" size={20} />
                <span>minha esposa e revisora deste conteúdo, obrigado por tudo! 😊</span>
            </Dedication>
        </Container>
    );
}
