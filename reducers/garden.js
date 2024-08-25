import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gardens: [],
}

export const gardenSlice = createSlice({
    name: 'garden',
    initialState,
    reducers: {
        updateGardens: (state, action) => {
           

            const garden = state.gardens.find(g => g.gardenName === action.payload.name);
            if (garden) {
                garden.gpURI = action.payload.gpURI;
            } else {
                state.gardens.push(action.payload);
            }
          
        },
        clearGardens: (state, action) => {
            
            state.gardens = [];
           
        }
    }
})

export const { updateGardens, clearGardens } = gardenSlice.actions
export default gardenSlice.reducer