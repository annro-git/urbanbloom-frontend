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
            if (username !== undefined) state.username = username;
            if (email !== undefined) state.email = email;
            if (token !== undefined) state.token = token;
            if (ppURI !== undefined) state.ppURI = ppURI;

            if (events !== undefined) {
                if (state.events.some(e => e.title === events.title)) {
                    state.events = state.events.filter(e => e.title !== events.title);
                } else {
                    state.events.push(events);
                }
            }
        },
        updateLocation: (state, action) => {
            const { latitude, longitude } = action.payload
            state.lastLocation = { latitude, longitude }
        },
        updateGardens: (state, action) => {

            console.log("🚀 ~ file: user.js:41 ~  action.payload", action.payload)

            if ((action.payload !== undefined) && (action.payload.length > 0)) {
                if (state.gardens.some(g => g.gardenName === action.payload.gardenName)) {
                    state.gardens = state.gardens.filter(g => g.gardenName !== action.payload.gardenName)
                }
            }
            else if (action.payload == []) {
                state.gardens = []
            }
            else {
                state.gardens = action.payload
            }
        },
        updateGardenppURI: (state, action) => {
            const { name, ppURI } = action.payload;
            const garden = state.gardens.find(g => g.gardenName === name);
            if (garden) {
                garden.ppURI = ppURI;
            } else {
                console.log(`Garden ${name} not found`);
            }
        },
        clearGardens: (state, action) => {
            state.gardens = [];
        }
    }
})

export const { updateUser, updateLocation, updateGardens, updateGardenppURI, clearGardens } = userSlice.actions
export default userSlice.reducer