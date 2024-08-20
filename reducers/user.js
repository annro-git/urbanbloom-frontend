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
        },
        updateLocation: (state, action) => {
            const { latitude, longitude } = action.payload
            state.lastLocation = { latitude, longitude }
        },
        updateGardens: (state, action) => {
            state.gardens = action.payload
        }
    }
})

export const { updateUser, updateLocation, updateGardens } = userSlice.actions
export default userSlice.reducer