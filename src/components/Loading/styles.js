
import styled, { css } from 'styled-components';
import { MdDonutLarge } from "react-icons/md";

export const Loading = styled(MdDonutLarge).attrs(props => ({
    size: 50,
    color: '#6747c7'
}))`
    opacity: .7;

    animation: rotating 0.6s linear infinite;

    @keyframes rotating {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    ${props => props.center && css`
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -20px;
    `}

`;
