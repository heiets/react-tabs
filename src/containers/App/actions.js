export const applyTable = (rows, cols) => {
    return {
        type: 'APPLY_TABLE',
        rows,
        cols
    }
};
export const changeTd = (rowIndex, colIndex, value) => {
    return {
        type: 'CHANGE_TD',
        rowIndex,
        colIndex,
        value
    }
};
export const addRow = (indexRow) => {
    return {
        type: 'ADD_ROW',
        indexRow
    }
};
export const addCol = (indexCol) => {
    return {
        type: 'ADD_COL',
        indexCol
    }
};
export const deleteRow = (indexRow) => {
    return {
        type: 'DELETE_ROW',
        indexRow
    }
};
export const deleteCol = (indexCol) => {
    return {
        type: 'DELETE_COL',
        indexCol
    }
};