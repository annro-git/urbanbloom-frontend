import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gardens: [],
    gpURI: [],
}

export const gardenSlice = createSlice({
    name: 'garden',
    initialState,
    reducers: {
        updateGardens: (state, action) => {
            state.gardens = action.payload
            state.gpURI.push(action.payload.gpURI)
        }
    }
})

export const { updateGardens } = gardenSlice.actions
export default gardenSlice.reducer