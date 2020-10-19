import styled from 'styled-components';

export const ContainerForm = styled.div`
    position: fixed;
    left: 80%;
    top: 17%;
`;

export const SaveButton = styled.button`
    position: fixed;
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
