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
`;

export const Content = styled.div`
    @media (min-width: 700px) {
        width: 50%;
    }

    @media (max-width: 700px) {
        width: 100%;
    }

    padding: 10px 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div:first-child {
        display: flex;

        @media (min-width: 700px) {
            flex-direction: row;
            align-items: center;
        }

        @media (max-width: 700px) {
            flex-direction: column;
        }

        strong {
            margin-right: 5px;
        }

        span {
            opacity: 0.5;
            font-size: 13px;
        }

        strong, span {
            display: block;
        }
    }
`;

export const Profile = styled.div`
    display: flex;

    > div {
        text-align: right;
        flex-direction: column;

        span {
            display: block;
            opacity: 0.5;
            font-size: 12px;
        }
    }

    /* @media(max-width: 700px) {
        div.info_usuario {
            display: none;
        }
    } */

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
    width: 100%;
    margin-top: 70px;
    background: #4F3AB7;
    padding: 10px 3px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    
    nav {
        @media (min-width: 700px) {
            width: 50%;
        }

        @media (max-width: 700px) {
            width: 100%;
        }

        a {
            color: #fff;
            text-decoration: none;
            padding: 13px;
            opacity: 0.5;

            :hover {
                background: ${darken(0.1, '#4F3AB7')};
                opacity: 1;
            }
        }
    }
`;
