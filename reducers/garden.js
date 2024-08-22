import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gardens: [],
}

export const gardenSlice = createSlice({
    name: 'garden',
    initialState,
    reducers: {
        updateGardens: (state, action) => {
            state.gardens = action.payload
        }
    }
})

export const { updateGardens } = gardenSlice.actions
export default gardenSlice.reducer