import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, fetchUsers, addUser, fetchUser, updateUser } from "../thunks";
import { userLogout } from "./authSlice";

const userListAfterDelete = (data, id) => {
    const filterData = JSON.parse(data).data.filter(user => user.id !== String(id));
    return {
        data: filterData,
        total: filterData.length
    }
}
export const fetchUsersSlice = createSlice({
    name: 'fetchUsers',
    initialState: {
        users: {},
        loading: false,
        error: null,
        message: null,
        lastAction: ''
    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.lastAction = '';
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = {};
            state.error = action.payload;
        });
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {

            state.loading = false;
            state.error = null;
            state.lastAction = 'delete';
            state.users = userListAfterDelete(JSON.stringify(state.users), action.meta.arg);
            state.message = action.payload;
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        });
        builder.addCase(addUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.lastAction = 'add';
            state.message = action.payload;
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        });
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.lastAction = 'fetchUser';
            state.users = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        });
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.lastAction = 'updateUser';
            state.message = action.payload;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        });

        builder.addCase(userLogout.toString(), (state, action) => { // to reset userList state on logout
            return {
                users: [],
                loading: false,
                error: null
            };
        })
    }
});
export const userReducer = fetchUsersSlice.reducer;