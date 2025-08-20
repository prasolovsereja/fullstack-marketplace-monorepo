import {createSlice} from "@reduxjs/toolkit";
import {User} from "../types/types";

interface authState {
    isAuthenticated: boolean;
    user: null | User;
    isLoading: boolean;
    isRefreshed: boolean;
}

const initialState: authState = {
    isAuthenticated: false,
    user: null,
    isLoading: true,
    isRefreshed: false,
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
        },
        toggleRefresh: (state, action) => {
            state.refreshed = action.payload;
        }
    }
});

export const { initUser, logoutUser, toggleRefresh } = authSlice.actions;
export default authSlice.reducer;