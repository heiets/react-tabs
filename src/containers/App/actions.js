export const applyTable = (rows, cols) => {
    return {
        type: 'APPLY_TABLE',
        rows,
        cols
    }
}