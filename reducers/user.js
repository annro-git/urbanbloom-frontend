import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    gardens: [],
    events: [],
    token: '',
    bio: '',
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
        },
        updateData: (state, action) => {
            const { bio, firstname, lastname } = action.payload
            state.firstname = firstname
            state.lastname = lastname
            state.bio = bio
        }
    }
})

export const { updateUser, updateLocation, updateGardens, updateData } = userSlice.actions
export default userSlice.reducer