import styled from 'styled-components';

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
