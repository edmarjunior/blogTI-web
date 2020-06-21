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

    a {
        margin: 5px 0;
        font-size: 24px;
    }

    span {
        opacity: 0.5;
        font-size: 14px;
    }
`;
