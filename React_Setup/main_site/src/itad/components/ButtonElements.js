import styled from 'styled-components';
import { Link as LinkScroll } from 'react-scroll'

export const Button = styled(LinkScroll)`
    border-radius: 50px;
    background: #000075;
    white-space: nowrap;
    padding: 5px 20px;
    color: #fff;
    font-size: 20px;
    outline: none;
    border: 2px solid #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    margin: 30px;
    font-family: 'Encode Sans Expanded', sans-serif;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: ${({ primary }) => (primary ? '#fff' : '#01BF71')};
    }

`;