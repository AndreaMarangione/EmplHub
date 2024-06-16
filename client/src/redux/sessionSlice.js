import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: {}
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload;
        },
        logout: (state) => {
            state.userData = {};
            localStorage.removeItem("token");
        }
    }
})

export const loginState = state => state.sessionState.userData;
export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
