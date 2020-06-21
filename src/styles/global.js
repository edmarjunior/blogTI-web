import { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0 !important;
        box-sizing: border-box;
    }

    body {
        height: 100%;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        background-color: #f0f0f0;
    }

    a {
        text-decoration: none !important;
        opacity: 0.6;
        
        :hover {
            opacity: 1;
        }
    }

    p, li {
        text-align: justify;
        line-height: 26px;
    }

    img {
        max-width: 100%
    }

    img.round {
        border-radius: 50%;
        border: 2px solid #eee; 
        box-shadow: none;
        padding: 3px;
    }

    .card {
        background-color: #fff;
        margin: 50px auto 10px;
        padding: 50px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
        word-wrap: break-word;

        @media(min-width: 700px) {
            width: 50%;
        }

        @media(max-width: 700px) {
            width: 100%;
        }
    }

`;
