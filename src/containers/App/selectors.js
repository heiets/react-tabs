import { createStructuredSelector } from 'reselect';

const REDUCER = 'App';

const table = state => state[REDUCER].table;
// const list = (state) => state.list;
export default createStructuredSelector({
    table
});