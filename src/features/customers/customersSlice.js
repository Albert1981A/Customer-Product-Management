import { createSlice } from '@reduxjs/toolkit';

const initialState = { customers: [] };

export const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        addOneCustomer: (state, action) => {
            state.customers = [ ...state.customers, action.payload ]
        },
        updateOneCustomer: (state, action) => {
            let arr = [...state.customers];
            const index = arr.findIndex(x => x.id === action.payload.id);
            if (index >= 0) {
                arr[index] = action.payload;
            }
            state.customers = arr;
        },
        deleteOneCustomer: (state, action) => {
            let arr2 = [...state.customers];
            arr2 = arr2.filter(x => x.id !== action.payload);
            state.customers = arr2;
        }
    }
});

export const { addOneCustomer, updateOneCustomer, deleteOneCustomer } = customersSlice.actions;

export default customersSlice.reducer;