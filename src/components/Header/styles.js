import styled from 'styled-components';
import { darken } from "polished";

export const HeaderCss = styled.header`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    background: #6747c7;
    color: #fff;
    display: flex;
    justify-content: center;
   
    > div {
        @media (min-width: 700px) {
            width: 80%;
        }

        @media (max-width: 700px) {
            width: 100%;
        }

        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        div.name {
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            strong {
                margin-right: 5px;
            }

            span {
                opacity: 0.5;
            }

            strong, span {
                display: block;
                min-width: 120px;
            }
        }
    }
`;

export const Profile = styled.div`
    display: flex;

    > div {
        text-align: right;
        flex-direction: column;
        min-width: 160px;
        span {
            display: block;
            opacity: 0.5;
            font-size: 12px;
        }
    }

    img {
        margin-left: 10px;
        border: 2px solid #ddd;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;

        :hover {
            border-color: #8ec9ff;
        }
    }
`

export const Menu = styled.div`
    margin-top: 70px;
    background: #4F3AB7;
    padding: 10px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    
    nav {
        @media (min-width: 700px) {
            width: 80%;
        }

        @media (max-width: 700px) {
            width: 100%;
        }

        a {
            color: #fff;
            text-decoration: none;
            padding: 14px;
            opacity: 0.5;

            :hover {
                background: ${darken(0.1, '#4F3AB7')};
                opacity: 1;
            }
        }
    }
`;
