import styled from 'styled-components';

export const Container = styled.div`
    max-width: 900px;
    margin: 30px auto 0;
    margin-bottom: 100px;
    padding: 10px;

    header {
        margin-bottom: 30px;
        h1 {
            color: #4C0E95;
        }

        span {
            display: block;
            opacity: 0.5;
            font-size: 12px;
        }
    }

    div {
        & + div {
            margin-top: 40px;
        }

        h2 {
            margin-bottom: 26px;;
        }
    }

    img {
        border: 1px solid #ccc;
        box-shadow: 2px 2px 5px rgba(0,0,0,.5);
        padding: 3px;
        border-radius: 3px;
    }

    ul {
        margin: 26px 0 0 20px;

    }
`;

export const Paragraph = styled.p`
    margin-top: 26px;
`;

export const ListImage = styled.div`
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
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

export const Dedication = styled.div`
    color: #4C0E95;

    svg {
        margin: 0 7px;
    }

`;