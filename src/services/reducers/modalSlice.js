import { createSlice } from "@reduxjs/toolkit";
import modal from "../../components/modal/modal";

const initialState = {
    modalData: []
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        changeData: (state, action) => {
            state.modalData = action.payload;
        }
    }
});

export const { changeData } = modalSlice.actions;
export default modalSlice.reducer;