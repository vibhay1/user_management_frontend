import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINT, axios, handleError, handleResponse } from "./api";
import { validateLogin } from "../../authentication";


const loginUser = createAsyncThunk(API_ENDPOINT.login, async (credentials, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(API_ENDPOINT.login, { email: credentials.username, password: credentials.password });
        return validateLogin(handleResponse(data, rejectWithValue));
    } catch (error) {
        return handleError(error, rejectWithValue);
    }

});
const registerUser = createAsyncThunk(API_ENDPOINT.register, async (formData, { rejectWithValue }) => {
    try {
        const toRegister = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        }
        const { data } = await axios.post(API_ENDPOINT.register, toRegister);
        return validateLogin(handleResponse(data, rejectWithValue));
    } catch (error) {
        return handleError(error, rejectWithValue);
    }

});


export { loginUser,registerUser }