import styled from 'styled-components';

export const Button = styled.button`
    border: none;
    opacity: 0.5;

    :hover {
        opacity: 1;
    }
`

export const ContainerPopOver = styled.div`

    > div {
        padding: 10px;
        display: flex;
        align-items: center;

        :hover {
            cursor: pointer;
            background-color: rgba(0,0,0, 0.05);
        }

        svg {
            margin-right: 7px;
        }
    }
`
