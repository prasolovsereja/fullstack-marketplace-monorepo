import {createSlice} from "@reduxjs/toolkit";
import {User} from "../types/types";

interface authState {
    isAuthenticated: boolean;
    user: null | User;
    isLoading: boolean;
}

const initialState: authState = {
    isAuthenticated: false,
    user: null,
    isLoading: true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        logoutUser: (state) => {
            state.user = null;
            state.isLoading = true;
            state.isAuthenticated = false;
        }
    }
});

export const { initUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;