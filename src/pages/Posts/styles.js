import styled from 'styled-components';

export const Container = styled.div`
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
`

export const Post = styled.div`
    width: 18%;
    margin: 0 5px;
    cursor: pointer;

    img {
        width: 100%;
    }

    :hover {
        opacity: 0.7;
    }

    h1 {
        font-size: 20px;
        color: #4F3AB7
    }
`

export const InfoContainer = styled.div`
    margin-top: 3px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const CreateButton = styled.button`
    position: absolute;
    left: 90%;
    top: 90%;
    border: none;
    border-radius: 50%;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    opacity: 0.7;
    transition: all .2s ease-in-out;
    padding: 8px;

    :hover {
        opacity: 1;
        transform: scale(1.3);
    }
`;
