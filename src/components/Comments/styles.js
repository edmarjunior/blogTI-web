import styled, { css } from 'styled-components';
import { lighten } from 'polished';

export const Conteiner = styled.div`
    margin-top: 50px;
    padding: 10px;
    background: #1c1e21;
    display: flex;
    justify-content: center;
    color: #fff;

    > div {

        @media(min-width: 700px) {
            width: 50%;
        }

        @media(max-width: 700px) {
            width: 100%;
        }

        img {
            padding: 0 !important;
            border: 0 !important;
        }
    }
`;

export const EntryComment = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
    word-wrap: break-word;
    
    img {
        margin-right: 8px;
    }
    
    textarea {
        width: 100%;
        padding: 5px;
        border-radius: 5px;
        background: ${lighten(0.05, '#1c1e21')};
        color: #fff;
        border: 0;
        height: auto;
        resize: none;
    }
`;

export const Commented = styled.div`
    display: flex;
    
    strong, span {
        display: block;
    }

    span {
        opacity: 0.6;
    }

    strong {
        font-weight: normal;
    }

    > div  {
        width: 100%;
        background: ${lighten(0.05, '#1c1e21')};
        margin-bottom: 8px;
        margin-left: 8px;
        padding: 8px;
        border-radius: 5px;
       
        ${props => props.new && css`
            animation: flash 1s linear 2;
            @keyframes flash {
                from {
                    background: ${lighten(0.05, '#1c1e21')};
                }

                to {
                    background: ${lighten(0.2, '#1c1e21')};
                }
            }
        `}
    }

    div.options {
        button {
            background: none;
            border: 0;
            color: #fff;
            opacity: 0.6;
            font-size: 12px;
            cursor: pointer;

            :hover {
                opacity: 1;
                text-decoration: underline;
            }
        }

        button + button {
            margin-left: 5px;

            &::before {
                content: '';
                border-left: 1px solid #ddd;
                padding-right: 5px;
            }
        }
    }

`;

export const ContainerResponse = styled.div`
    display: ${props => props.show ? "block" : "none"};
`;

export const EntryResponse = styled.div`
    display: ${props => props.show ? "flex" : "none"};
    align-items: flex-start;
    margin: 5px 0;
    padding: 5px 0;
    border-bottom: 1px solid #ddd;
    word-wrap: break-word;

    img {
        margin-left: 20px;
        margin-right: 5px;
    }
    
    textarea {
        width: 100%;
        padding: 5px;
        border-radius: 5px;
        background: ${lighten(0.1, '#1c1e21')};
        color: #fff;
        border: 0;
        height: auto;
        resize: none;
    }
`;

export const Response = styled.div`
    display: ${props => props.show ? "block" : "none"};

    > div {
        display: flex;
        align-items: flex-start;
        margin-left: 20px;

        > div {
            margin-bottom: 5px;
            margin-left: 5px;
            background: ${lighten(0.1, '#1c1e21')};
            padding: 8px;
            border-radius: 5px;
        }
    }

    div.new-response {
        animation: flash 1s linear 2;
        @keyframes flash {
            from {
                background: ${lighten(0.05, '#1c1e21')};
            }

            to {
                background: ${lighten(0.2, '#1c1e21')};
            }
        }
    }
`;
