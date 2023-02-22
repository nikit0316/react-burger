import { configureStore } from '@reduxjs/toolkit';
import orderReducer from "./orderSlice";
import { ingredientAPI } from "./ingredientAPI";

const store = configureStore({
    reducer: {
        order: orderReducer,
        [ingredientAPI.reducerPath]: ingredientAPI.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ingredientAPI.middleware),
})

export default store;