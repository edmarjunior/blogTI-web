import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        height: 100%;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    p, li {
        text-align: justify;
        line-height: 26px;
    }
`;
