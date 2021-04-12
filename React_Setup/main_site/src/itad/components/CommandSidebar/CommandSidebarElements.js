import styled from 'styled-components';

export const LeftPane = styled.div`
    position: absolute;
    z-index: 0;
    top: 15%;
    width: 30%;
    height: 70vh;
    transition: all 0.7s ease-in-out;
    margin-left: -25%;
    background-color: #000038;
    border-radius: 50px;
    border: 2px solid #fff;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);

    &:hover {
        transition: all 0.3s ease-in-out;
        margin-left: -9%;
    }
`;

export const RightPane = styled.div`
    position: absolute;
    z-index: 0;
    top: 15%;
    right: 0;
    float:right;
    width: 30%;
    height: 70vh;
    transition: all 0.7s ease-in-out;
    margin-right: -25%;
    background-color: #000038;
    border-radius: 50px;
    border: 2px solid #fff;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);

    &:hover {
        transition: all 0.3s ease-in-out;
        margin-right: -9%;
    }
`;

export const LeftPaneWrap = styled.div`
    position: relative;
    float: right;
    width: 80%;
    margin-left: 8%;
    margin-right: -3%;
    border-radius: 50px;
`;

export const RightPaneWrap = styled.div`
    position: relative;
    width: 80%;
    margin-right: 8%;
    margin-left: -3%;
    border-radius: 50px;

`;

export const CommandList = styled.div`
    
`;

export const CommandItem = styled.h5`
    color: #fff;
    border-radius: 50px;
    border: 2px solid #fff;
    transition: all 0.3s ease-in-out;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin: 10%;
    height: 12vh;
    font-family: 'Encode Sans Expanded', sans-serif;
    font-size: 2vh;
    cursor: pointer;
    background: #000075;

    &:hover {
        transition: all 0.3s ease-in-out;
        background-color: #fff;
        border: 2px solid #000;
        color: #000;
    }

    @media screen and (max-width: 1300px) {
        font-size: 15px;
    }
`;