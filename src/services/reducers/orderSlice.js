import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    number: 0
}

/*export const fetchIngredients = createAsyncThunk(
    "ingredients/fetchIngredients",
     async () => {
            const response = await fetch(`${BURGER_API_URL}/ingredients`);
            console.log('fetched')
            if (!response.ok) {
                console.log('sup')
                await Promise.reject(response)
                throw new Error('Ответ сети был не ok.');
            } else {
                const json = await response.json();
                console.log(json)
                return json.data;
            }
    }
)*/

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addIngredient: (state, action) => {
            console.log(action.payload)
            state.cart.push(action.payload)
        },
        addNumber: (state) => {
            state.number += 1;
        }
    },

    /*extraReducers: builder => {
        builder.addCase(fetchIngredients.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {
            state.data = action.payload
                state.loading = false
        })
        builder.addCase(fetchIngredients.rejected, (state, action) => {
            state.data = []
            state.loading = false
        })
    }*/
});

export const { addIngredient, addNumber } = orderSlice.actions;
export default orderSlice.reducer;