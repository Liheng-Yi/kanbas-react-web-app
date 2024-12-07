import { createSlice } from "@reduxjs/toolkit";

// Define user interface
interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "faculty" | "student";
  email: string;
}

interface AccountState {
  currentUser: User | null;
}

const initialState: AccountState = {
  currentUser: {
    _id: "1",
    username: "student",
    password: "student123",
    firstName: "Student",
    lastName: "User",
    role: "student",
    email: "student@example.com",
  },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    toggleRole: (state) => {
      if (state.currentUser) {
        state.currentUser.role =
          state.currentUser.role === "faculty" ? "student" : "faculty";
      }
    },
  },
});

export const { setCurrentUser, logout, toggleRole } = accountSlice.actions;
export default accountSlice.reducer;

// Selector
export const selectCurrentUser = (state: any) =>
  state.accountReducer.currentUser;
