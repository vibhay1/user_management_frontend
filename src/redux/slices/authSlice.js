
import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../thunks';


const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        userLogout: (state, action) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null
            state.user = action.payload;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload;
        });
    },
});
const registerSlice = createSlice({
    name: 'register',
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null
            state.user = action.payload;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload;
        });
    },
});

export const { userLogout } = authSlice.actions;

export const authReducer = authSlice.reducer;
export const registerReducer = registerSlice.reducer;
