import styled from "styled-components";

export const Card = styled.div`
    position: relative;
    /* z-index: 2; */
    background-color: #fff;

    @media(min-width: 700px) {
        width: 80%;
    }

    @media(max-width: 700px) {
        width: 96%;
    }


    margin: 100px auto 10px;
    padding: 24px;

    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

    
    p {
        margin-top: 26px;
    }

    > article header {
        span {
            display: block;
            opacity: 0.5;
            font-size: 12px;
        }
    }

    section {
        margin-top: 40px;
    }

    img {
        border: 1px solid #ccc;
        box-shadow: 2px 2px 5px rgba(0,0,0,.5);
        padding: 3px;
        border-radius: 3px;
    }

    ul {
        margin-top: 20px;
        margin-left: 20px;

    }
`;