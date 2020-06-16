import styled from 'styled-components';

export const Header = styled.header`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    background: #6747c7;
    color: #fff;
    display: flex;
    justify-content: center;
   
    > div {

        @media (min-width: 700px) {
            width: 80%;
        }

        @media (max-width: 700px) {
            width: 100%;
        }

        padding: 10px;
        width: 80%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        div.name {
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            strong {
                margin-right: 5px;
            }

            span {
                opacity: 0.5;
            }

            strong, span {
                display: block;
                min-width: 120px;
            }
        }

        
    }
`;

export const Profile = styled.div`
    display: flex;

    > div {
        text-align: right;

        span {
            display: block;
            opacity: 0.5;
            font-size: 12px;
        }
    }

    img {
        margin-left: 10px;
        border: 2px solid #ddd;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;

        :hover {
            border-color: #8ec9ff;
        }
    }
`


export const Menu = styled.div`
   
`;