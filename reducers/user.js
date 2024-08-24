import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    firstname: '',
    lastname: '',
    ppURI: '',
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
            const { username, email, token, ppURI } = action.payload
            state.username = username !== undefined ? username : state.username
            state.email = email !== undefined ? email : state.email
            state.token = token !== undefined ? token : state.token
            state.ppURI = ppURI
        },
        updateLocation: (state, action) => {
            const { latitude, longitude } = action.payload
            state.lastLocation = { latitude, longitude }
        },
        updateGardens: (state, action) => {
            state.gardens.push(action.payload)
        },
    }
})

export const { updateUser, updateLocation, updateGardens } = userSlice.actions
export default userSlice.reducer