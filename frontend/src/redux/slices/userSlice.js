import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    lastName: "",
    image: "",
    role: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
            state.image = action.payload.image;
            state.role = action.payload.role;
        },
        logoutUser: (state) => {
            return initialState;
        }
    },
})

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

