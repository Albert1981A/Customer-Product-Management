import { createSlice } from '@reduxjs/toolkit';

const initialState = { products: [] };

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        initProductData: (state, action) => {
            state.products = action.payload;
        },
        addOneProduct: (state, action) => {
            state.products = [ ...state.products, action.payload ]
        },
        updateOneProduct: (state, action) => {
            let arr = [...state.products];
            const index = arr.findIndex(x => x.id === action.payload.id);
            if (index >= 0) {
                arr[index] = action.payload;
            }
            state.products = arr;
        },
        deleteOneProduct: (state, action) => {
            let arr2 = [...state.products];
            arr2 = arr2.filter(x => x.id !== action.payload);
            state.products = arr2;
        }
    }
});

export const { initProductData, addOneProduct, updateOneProduct, deleteOneProduct } = productsSlice.actions;

export default productsSlice.reducer;
