import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: '',
}

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        add: (state, action) => {
            state.value = action.payload
        },
        remove: (state, action) => {
            state.value = ''
        }
    }
})

export const { add, remove } = testSlice.actions
export default testSlice.reducer