import styled, { css } from 'styled-components';

export const Aside = styled.aside`
    position: fixed;
    z-index: 3;
    top: 50%;
    left: 5%;
    border: 0;
    display: flex;
    align-items: center;
    
    span {
        display: block;
        opacity: 0.6;
        font-size: 13px;
    }
`;

export const LikeButton =styled.button.attrs(props => ({
    title:  props.curtido ? 'Obrigado por curtir esse post' : 'Curtir',
}))`
    background: transparent;
    opacity: ${(props => props.curtido ? '1' : '0.5')};
    border: 0;
    transition: all 0.5s ease-in-out;
    
    :hover {
        transform: scale(1.5);
        opacity: 1;
        margin-right: 10px;
    }

    ${(props => props.curtido && css`
        transform: scale(1.5);
        opacity: 1;
        margin-right: 10px;
        cursor: default !important;
    `)}

    ${(props => !props.curtido && css`
        animation: up 2s linear infinite;
        @keyframes up {
            from {
                transform: scale(1);
                margin-right: 0px;
            }

            to {
                transform: scale(1.5);
                margin-right: 10px;
            }
        }
    `)}
`;

export const ListImage = styled.div`
    display: flex;
    img + img {
        margin-left: 10px;
    }
`;

export const ContainerRepository = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    margin: 10px auto;
    
    :hover {
        background: #eee;
    }

    img {
        border: 0;
        box-shadow: none;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 2px solid #eee; 
    }

    a {
        text-decoration: none;
        margin: 5px 0;
        font-size: 24px;
        opacity: 0.6;

        :hover {
            opacity: 1;

        }
    }

    span {
        opacity: 0.5;
        font-size: 14px;

    }
`;
