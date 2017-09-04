import { combineReducers } from 'redux';

const initialState = {
    initialData: [],
    filteredResult: {
        'row1': {
            'col1': '1.1',
            'col2': '1.2',
            'col3': '1.3',
            'col4': '1.4'
        },
        'row2': {
            'col1': '2.1',
            'col2': '2.2',
            'col3': '2.3',
            'col4': '2.4'
        }
    }
};

const table = (state = initialState, action) => {
    switch (action.type) {
        case 'APPLYTABLE':
            console.log(action.rows);
            console.log(action.cols);
            return { ...state, filteredResult: action.result };
        default:
            return state;
    }
};

export default combineReducers({
    table
})
