import { createSlice } from '@reduxjs/toolkit';

const initialState = { purchases: [] };

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState,
    reducers: {
        addOnePurchase: (state, action) => {
            state.purchases = [ ...state.purchases, action.payload ]
        },
        updateOnePurchase: (state, action) => {
            let arr = [...state.purchases];
            const index = arr.findIndex(x => x.id === action.payload.id);
            if (index >= 0) {
                arr[index] = action.payload;
            }
            state.purchases = arr;
        },
        deleteOnePurchase: (state, action) => {
            let arr2 = [...state.purchases];
            arr2 = arr2.filter(x => x.id !== action.payload);
            state.purchases = arr2;
        }
    }
});

export const { addOnePurchase, updateOnePurchase, deleteOnePurchase } = purchasesSlice.actions;

export default purchasesSlice.reducer;