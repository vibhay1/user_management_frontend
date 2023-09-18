import { configureStore } from '@reduxjs/toolkit';
import { authReducer, registerReducer } from './slices/authSlice';
import { userReducer } from './slices/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register:registerReducer,
        users: userReducer
    },
});

export * from './thunks'