import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
    total: number;
}

const initialState: CounterState = {
    total: 0,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incrementCount(state) {
            state.total += 1;
        },
        resetCount(state) {
            state.total = 0;
        },
    },
});

export const { incrementCount, resetCount } = counterSlice.actions;

export default counterSlice.reducer;