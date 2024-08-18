import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    gardens: [],
    events: [],
    token: '',
    lastLocation: {
        latitude: '',
        longitude: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { username, email, token } = action.payload
            state.username = username
            state.email = email
            state.token = token
        }
    }
})

export const { updateUser } = userSlice.actions
export default userSlice.reducer