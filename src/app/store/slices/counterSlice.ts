import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
    total: number;
    count: number;
}

const initialState: CounterState = {
    total: 0,
    count: 0, // Добавьте это свойство
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incrementCount(state) {
            state.total += 1;
            state.count += 1; // При необходимости обновляйте count
        },
        resetCount(state) {
            state.total = 0;
            state.count = 0; // Сбрасывайте count при необходимости
        },
    },
});

export const { incrementCount, resetCount } = counterSlice.actions;

export default counterSlice.reducer;