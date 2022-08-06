import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import customersReducer from '../features/customers/customersSlice';
import purchasesReducer from '../features/purchases/purchasesSlice';



export const store = configureStore({
    reducer: {
        productsList: productsReducer,
        customersList: customersReducer,
        purchasesList: purchasesReducer,
    },
});