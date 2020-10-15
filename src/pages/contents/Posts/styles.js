import styled from 'styled-components';

export const Container = styled.div`
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
`
export const Post = styled.div`
    width: 20%;
    margin: 0 5px;
    cursor: pointer;

    :hover {
        opacity: 0.7;
    }

    h1 {
        margin-top: 3px;
        font-size: 20px;
        color: #4F3AB7
    }
`
