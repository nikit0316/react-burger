import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    ingredientData: [],
    orderNumber: 0,
    orderName: ''
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        changeIngredientData: (state, action) => {
            state.ingredientData = action.payload;
        },
        changeOrderData: (state, action) => {
            state.orderNumber = action.payload.order.number;
            state.orderName = action.payload.name;
        }
    }
});

export const {changeIngredientData, changeOrderData} = modalSlice.actions;
export default modalSlice.reducer;