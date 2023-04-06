import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BURGER_API_URL } from "../../utils/data";

export const ingredientAPI = createApi({
    reducerPath: 'ingredientAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BURGER_API_URL}`}),
        endpoints: (builder) => ({
            getIngredients: builder.query({
                query: (name) => '/ingredients',
            }),
            addOrder: builder.mutation({
            query: (ingredients) => ({
                url: `/orders`,
                method: 'POST',
                body: ingredients,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Post']
        }),
    }),
})

export const { useGetIngredientsQuery, useAddOrderMutation } = ingredientAPI;