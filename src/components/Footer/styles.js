import styled from 'styled-components';

export const Container = styled.div`
    height: 50px;
    background: linear-gradient(-90deg, #fff, #4C0E95);
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    color: #4C0E95;

    a, svg {
        opacity: 0.7;
        margin: 0 6px;
        cursor: pointer;

        :hover {
            opacity: 1;
        }
    }
`;
