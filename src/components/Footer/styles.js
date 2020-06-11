import styled from 'styled-components';

export const Container = styled.div`
    z-index: 1;
    height: 50px;
    background: linear-gradient(-90deg, #fff, #4C0E95);
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    /* margin-right: 30px; */
    display: none;
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
