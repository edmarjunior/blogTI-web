import styled from 'styled-components';

export const Container = styled.div`
    height: 50px;
    background: linear-gradient(-90deg, #fff, #4C0E95);
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #4C0E95;

    div {
        padding: 0 30px;

        a {
            opacity: 0.6;
            
            :hover {
                opacity: 1;
            }
        }
    }
`;
