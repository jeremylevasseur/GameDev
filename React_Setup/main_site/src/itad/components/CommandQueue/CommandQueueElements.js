import styled from 'styled-components';

export const CommandTable = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-left: 20%;
    margin-right: 20%;
    margin-bottom: 100px;
    border: 3px solid black;
    border-radius: 5px;
`;

export const CommandTableHeaderRow = styled.div`
    display: flex;
    min-height: 50px;
`;

export const CommandTableHeaderCell = styled.div`
    flex: 4;
    padding-top: 10px;
    border: 2px solid black;
    border-radius: 1px;
    font-weight: bold;
    font-size: 1.3rem;
`;

export const CommandTableRow = styled.div`
    display: flex;
    min-height: 50px;
`;

export const CommandCell = styled.div`
    flex: 4;
    padding-top: 10px;
    border: 2px solid black;
    border-radius: 1px;
`;