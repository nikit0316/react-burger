import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    number: 0
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addIngredient: (state, action) => {
            if (action.payload.type === 'bun') {
                if (state.cart[0] !== undefined && state.cart[0].type === 'bun')
                {
                    state.cart[0] = action.payload;
                    state.cart.pop();
                    state.cart.push(action.payload);
                } else {
                    state.cart.unshift(action.payload);
                    state.cart.push(action.payload);
                }
            } else {
                state.cart.splice(1, 0, action.payload)
            }
        },
        deleteIngredient: (state, action) => {
            let index = state.cart.findIndex((x) => x._id === action.payload)
            state.cart.splice(index, 1)
        },
        reorderIngedients: (state, action) => {
            state.cart.splice(action.payload.dragIndex, 0, state.cart.splice(action.payload.hoverIndex, 1)[0]);
        },
    },

});

export const { addIngredient, deleteIngredient, reorderIngedients } = orderSlice.actions;
export default orderSlice.reducer;