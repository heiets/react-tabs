import { createStructuredSelector } from 'reselect';

const REDUCER = 'App';

const table = state => state[REDUCER].table;

export default createStructuredSelector({
    table
});