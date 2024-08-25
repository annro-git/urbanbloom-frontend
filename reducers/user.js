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
            const { username, email, token, ppURI, events } = action.payload
            state.username = username
            state.email = email
            state.token = token
            state.ppURI = ppURI

            if (state.events.some(e => e.id === events.id)) {
                state.events = state.events.filter(e => e.id !== events.id)
            }
            else {
                state.events.push(events)
            }
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