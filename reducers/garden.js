import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gardens: [],
}

export const gardenSlice = createSlice({
    name: 'garden',
    initialState,
    reducers: {
        updateGardens: (state, action) => {
            console.log("Action payload:", action.payload);
            console.log("State gardens before update:", state.gardens);

            const garden = state.gardens.find(g => g.gardenName === action.payload.name);
            if (garden) {
                garden.gpURI = action.payload.gpURI;
            } else {
                state.gardens.push(action.payload);
            }
            console.log("State gardens after update:", state.gardens);
        },
        clearGardens: (state, action) => {
            console.log(state)
            state.gardens = [];
            console.log("State gardens after clear:", state);  
        }
    }
})

export const { updateGardens, clearGardens } = gardenSlice.actions
export default gardenSlice.reducer