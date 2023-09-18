import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINT, axios, handleError, handleResponse } from "./api";


const fetchUsers = createAsyncThunk(API_ENDPOINT.userList, async ({ page, limit }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${API_ENDPOINT.userList}/${limit}/${page}`);
        return handleResponse(data, rejectWithValue);
    } catch (error) {
        return handleError(error, rejectWithValue);
    }

});
const deleteUser = createAsyncThunk(API_ENDPOINT.userDelete, async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(API_ENDPOINT.userDelete, {
            data: {
                id: id
            }
        });
        return handleResponse(data, rejectWithValue);
    } catch (error) {
        return handleError(error, rejectWithValue);
    }

});
const addUser = createAsyncThunk(API_ENDPOINT.userAdd, async (formData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(API_ENDPOINT.userAdd, formData);
        return handleResponse(data, rejectWithValue);
    } catch (error) {
        return handleError(error, rejectWithValue);
    }

});
const fetchUser = createAsyncThunk(API_ENDPOINT.userFetch, async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(API_ENDPOINT.userFetch + '/' + id);
        return handleResponse(data, rejectWithValue);
    } catch (error) {
        return handleError(error, rejectWithValue);
    }

});
const updateUser = createAsyncThunk(API_ENDPOINT.userUpdate, async (formData, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(API_ENDPOINT.userUpdate, formData);
        return handleResponse(data, rejectWithValue);
    } catch (error) {
        return handleError(error, rejectWithValue);
    }

});


export { fetchUsers, deleteUser, addUser, fetchUser, updateUser }