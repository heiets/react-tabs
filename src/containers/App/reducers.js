import { combineReducers } from 'redux';

const initialState = {
    table: {
        'row1': {
            'col1': {
                value: '1.1',
                colspan: 1,
                rowspan: 1,
                rowIndex: 1,
                colIndex: 1
            },
            'col2': {
                value: '1.2',
                colspan: 1,
                rowspan: 1,
                rowIndex: 1,
                colIndex: 2
            },
            'col3': {
                value: '1.3',
                colspan: 1,
                rowspan: 1,
                rowIndex: 1,
                colIndex: 3
            },
            'col4': {
                value: '1.4',
                colspan: 1,
                rowspan: 1,
                rowIndex: 1,
                colIndex: 4
            }
        },
        'row2': {
            'col1': {
                value: '2.1',
                colspan: 1,
                rowspan: 1,
                rowIndex: 2,
                colIndex: 1
            },
            'col2': {
                value: '2.2',
                colspan: 1,
                rowspan: 1,
                rowIndex: 2,
                colIndex: 2
            },
            'col3': {
                value: '2.3',
                colspan: 1,
                rowspan: 1,
                rowIndex: 2,
                colIndex: 3
            },
            'col4': {
                value: '2.4',
                colspan: 1,
                rowspan: 1,
                rowIndex: 2,
                colIndex: 4
            }
        },
        'row3': {
            'col1': {
                value: '3.1',
                colspan: 1,
                rowspan: 1,
                rowIndex: 3,
                colIndex: 1
            },
            'col2': {
                value: '3.2',
                colspan: 1,
                rowspan: 1,
                rowIndex: 3,
                colIndex: 2
            },
            'col3': {
                value: '3.3',
                colspan: 1,
                rowspan: 1,
                rowIndex: 3,
                colIndex: 3
            },
            'col4': {
                value: '3.4',
                colspan: 1,
                rowspan: 1,
                rowIndex: 3,
                colIndex: 4
            }
        },
        'row4': {
            'col1': {
                value: '4.1',
                colspan: 1,
                rowspan: 1,
                rowIndex: 4,
                colIndex: 1
            },
            'col2': {
                value: '4.2',
                colspan: 1,
                rowspan: 1,
                rowIndex: 4,
                colIndex: 2
            },
            'col3': {
                value: '4.3',
                colspan: 1,
                rowspan: 1,
                rowIndex: 4,
                colIndex: 3
            },
            'col4': {
                value: '4.4',
                colspan: 1,
                rowspan: 1,
                rowIndex: 4,
                colIndex: 4
            }
        }
    }
};
const table = (state = initialState.table, action) => {
    switch (action.type) {
        case 'APPLY_TABLE':
            const rowsCount = [...Array(+action.rows)].map(() => {
                return 1;
            });
            const colsCount = [...Array(+action.cols)].map(() => {
                return 1;
            });
            return {
                ...(rowsCount).reduce((prev, curr, rowIndex) => ({
                    ...prev,
                    [`row${rowIndex+1}`]: {
                        ...(colsCount).reduce((prev, curr, colIndex) => ({
                            ...prev,
                            [`col${colIndex+1}`]: {
                                value: ' ',
                                colspan: 1,
                                rowspan: 1,
                                rowIndex: rowIndex+1,
                                colIndex: colIndex+1
                            }
                        }), {})
                    }
                }), {})
            };
        case 'CHANGE_TD':
            return {
            ...state,
            [`row${action.rowIndex}`]: {
                ...state[`row${action.rowIndex}`],
                [`col${action.colIndex}`]: {
                    ...state[`row${action.rowIndex}`][`col${action.colIndex}`],
                    value: action.value
                }
            }
        };
        case 'ADD_ROW':
            let stateRowsKeysForRows = Object.keys(state);
            let stateRowsCountForRows = Object.keys(state).length;
            let stateColsKeysForRows = Object.keys(state[`row1`]);
            let addRowToIndex = +action.indexRow || stateRowsCountForRows;
            if (+action.indexRow > +stateRowsCountForRows) addRowToIndex = stateRowsCountForRows;
            let newTableAfterAddingRows = {
                ...state
            };
            stateRowsKeysForRows.reverse().forEach((rowKey, rowIndex)=>{
                if (addRowToIndex + 1 <= stateRowsCountForRows - rowIndex && addRowToIndex !== stateRowsCountForRows) {
                    let newObjForRow = {};
                    stateColsKeysForRows.forEach((colKey, colIndex) => {
                        newObjForRow[`col${+colIndex + 1}`] = {
                            value: newTableAfterAddingRows[`row${+stateRowsCountForRows - rowIndex}`][`col${+colIndex + 1}`].value,
                            colspan: 1,
                            rowspan: 1,
                            rowIndex: +stateRowsCountForRows + 1,
                            colIndex: +colIndex + 1
                        }
                    });
                    newTableAfterAddingRows[`row${+stateRowsCountForRows - rowIndex + 1}`] = newObjForRow;
                }
            });
            let newObjForNewRow = {};
            stateColsKeysForRows.forEach((colKey, colIndex) => {
                newObjForNewRow[`col${+colIndex + 1}`] = {
                    value: ' ',
                    colspan: 1,
                    rowspan: 1,
                    rowIndex: addRowToIndex,
                    colIndex: +colIndex + 1
                }
            });
            newTableAfterAddingRows[`row${addRowToIndex + 1}`] = newObjForNewRow;
            return newTableAfterAddingRows;
        case 'DELETE_ROW':
            let deleteStateRowsKeysForRows = Object.keys(state);
            let deleteStateRowsCountForRows = Object.keys(state).length;
            let deleteStateColsKeysForRows = Object.keys(state[`row1`]);
            let deleteRowToIndex = +action.indexRow || deleteStateRowsCountForRows;
            if (+action.indexRow > +deleteStateRowsCountForRows) deleteRowToIndex = deleteStateRowsCountForRows;
            let newTableAfterDelRows = {
                ...state
            };
            deleteStateRowsKeysForRows.forEach((rowKey, rowIndex)=>{
                if (deleteRowToIndex + 1 <= deleteStateRowsCountForRows - rowIndex && deleteRowToIndex !== deleteStateRowsCountForRows) {
                    let newObjForRow = {};
                    deleteStateColsKeysForRows.forEach((colKey, colIndex) => {
                        newObjForRow[`col${+colIndex + 1}`] = {
                            value: newTableAfterDelRows[`row${deleteRowToIndex + rowIndex + 1}`][`col${+colIndex + 1}`].value,
                            colspan: 1,
                            rowspan: 1,
                            rowIndex: deleteRowToIndex + rowIndex + 1,
                            colIndex: +colIndex + 1
                        }
                    });
                    newTableAfterDelRows[`row${deleteRowToIndex + rowIndex}`] = newObjForRow;
                }
            });
            delete newTableAfterDelRows[`row${deleteStateRowsCountForRows}`];
            return newTableAfterDelRows;
        case 'ADD_COL':
            let stateRowsKeys = Object.keys(state);
            let stateColsKeysForCols = Object.keys(state[`row1`]);
            let stateColsCount = Object.keys(state[`row1`]).length;
            let addToIndex = +action.indexCol || stateColsCount;
            if (+action.indexCol > +stateColsCount) addToIndex = stateColsCount + 1;
            let newTableAfterAddingCols = {
                ...state
            };
            stateRowsKeys.forEach((rowKey,rowIndex)=>{
                stateColsKeysForCols.reverse().forEach((colKey,colIndex)=> {
                    if (addToIndex > colIndex && addToIndex - 1 !== stateColsCount) {
                        newTableAfterAddingCols[`row${+rowIndex + 1}`][`col${stateColsCount - colIndex + 1}`] = {
                            value: newTableAfterAddingCols[`row${+rowIndex + 1}`][`col${stateColsCount - colIndex}`].value,
                            colspan: 1,
                            rowspan: 1,
                            rowIndex: +rowIndex + 1,
                            colIndex: stateColsCount - colIndex + 1
                        }
                    }
               });
                newTableAfterAddingCols[`row${+rowIndex + 1}`][`col${addToIndex}`] = {
                    value: '',
                    colspan: 1,
                    rowspan: 1,
                    rowIndex: +rowIndex + 1,
                    colIndex: addToIndex
                }
            });
            return newTableAfterAddingCols;
        case 'DELETE_COL':
            let deleteStateRowsKeys = Object.keys(state);
            let deleteStateColsKeysForCols = Object.keys(state[`row1`]);
            let deleteStateColsCount = Object.keys(state[`row1`]).length;
            let deleteToIndex = +action.indexCol || deleteStateColsCount;
            if (+action.indexCol > +deleteStateColsCount) deleteToIndex = deleteStateColsCount;
            let newTableAfterDelCols = {
                ...state
            };
            deleteStateRowsKeys.forEach((rowKey,rowIndex)=>{
                deleteStateColsKeysForCols.forEach((colKey,colIndex)=> {
                    if (deleteToIndex > colIndex && deleteToIndex !== deleteStateColsCount) {
                        newTableAfterDelCols[`row${+rowIndex + 1}`][`col${deleteToIndex + colIndex}`] = {
                            value: newTableAfterDelCols[`row${+rowIndex + 1}`][`col${deleteToIndex + colIndex + 1}`].value,
                            colspan: 1,
                            rowspan: 1,
                            rowIndex: +rowIndex + 1,
                            colIndex: deleteToIndex + colIndex
                        }
                    }
                });
                delete newTableAfterDelCols[`row${+rowIndex + 1}`][`col${deleteStateColsCount}`];
            });
            return newTableAfterDelCols;
        default:
            return state;
    }
};

export default combineReducers({
    table
})
