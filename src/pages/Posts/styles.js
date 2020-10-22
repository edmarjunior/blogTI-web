import styled from 'styled-components';

export const Container = styled.div`
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
`

export const Post = styled.div`
    border: 1px solid #ddd;
    padding: 10px;
    margin: 5px;
    display: flex;
    flex-direction: column;

    @media(min-width: 730px) {
        width: 18%;
        cursor: pointer;
        opacity: 0.85;
        transition: all .2s ease-in-out;

        :hover {
            opacity: 1;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
            transform: scale(1.1);

            img {
                opacity: 1;
            }
        }
    }

    @media(max-width: 730px) {
        width: 95%;
    }
`

export const InfoContainer = styled.div`
    margin-top: 3px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    img {
        width: 100%;
    }

    > h1 {
        font-size: 18px;
        color: #4F3AB7;
        margin: 5px 0 0;
        max-width: 320px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const CreateButton = styled.button`
    position: fixed;
    border: none;
    border-radius: 50%;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    opacity: 0.7;
    transition: all .2s ease-in-out;
    padding: 5px;

    @media(min-width: 730px) {
        top: 90%;
        left: 90%;

        :hover {
            opacity: 1;
            transform: scale(1.3);
        }
    }

    @media(max-width: 730px) {
        opacity: 1;
        top: 90%;
        left: 80%;
    }
`;
