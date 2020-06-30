import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    color: #fff;
    border-top: 1px solid #fff;

    a, svg {
        opacity: 0.7;
        margin: 0 6px;
        cursor: pointer;

        :hover {
            opacity: 1; 
        }
    }

    div.content {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #333333;
        padding: 20px;


        > div + div {
            margin-top: 10px;
            text-align: center;
        }

        span.info {
            font-size: 14px;
            opacity:  0.7;
        }
    }
`;
