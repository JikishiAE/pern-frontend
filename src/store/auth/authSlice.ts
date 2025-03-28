import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const name = localStorage.getItem('name');
const email = localStorage.getItem('email');

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: token ? 'authenticated' : 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
        token: token ? token : null,
        email: email ? email : null,
        name: name ? name : null,
        errorMessage: null,
    },
    reducers: {
        login: ( state, { payload } ) => {
            state.status = 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.token = payload.token;
            state.email = payload.email;
            state.name = payload.name;
            state.errorMessage = null;
        },
        logout: ( state, { payload } ) => {
            state.status = 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.token = null;
            state.email = null;
            state.name = null;
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;