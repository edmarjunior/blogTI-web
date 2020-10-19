import styled from 'styled-components';

export const Container = styled.div`
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`

export const FormCss = styled.form`
    > div {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;

        label {
            margin: 0;
            opacity: 0.8;
        }
    }
`;
