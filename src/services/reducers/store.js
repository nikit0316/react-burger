import { configureStore } from '@reduxjs/toolkit';
import orderReducer from "./orderSlice";
import { ingredientAPI } from "./ingredientAPI";
import modalSlice from "./modalSlice";

const store = configureStore({
    reducer: {
        order: orderReducer,
        modal: modalSlice,
        [ingredientAPI.reducerPath]: ingredientAPI.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ingredientAPI.middleware),
})

export default store;