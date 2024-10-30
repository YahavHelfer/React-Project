import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../Types/TUser";

// אחזור מצב התחברות מ-localStorage
const savedUser = localStorage.getItem("user");
const initialUserState = {
  isLoggedIn: !!savedUser, // True אם יש משתמש שמור
  user: savedUser ? (JSON.parse(savedUser) as TUser) : null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    // ACTIONS
    login: (state: TUserState, data: PayloadAction<TUser>) => {
      state.isLoggedIn = true;
      state.user = data.payload;

      // שמירת המשתמש ב-localStorage
      localStorage.setItem("user", JSON.stringify(data.payload));
    },
    logout: (state: TUserState) => {
      state.isLoggedIn = false;
      state.user = null;

      // הסרת המשתמש מ-localStorage
      localStorage.removeItem("user");
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
export type TUserPayload = { userName: string };
export type TUserState = typeof initialUserState;
