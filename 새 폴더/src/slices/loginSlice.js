import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";

const initState = { email: "", password: "" };

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) =>
  loginPost(param)
);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      console.log("login....");
      const data = action.payload;
      console.log("data :", data);
      return { email: data.email, password: data.password }; // ✅ 수정됨
    },
    logout: (state, action) => {
      console.log("logout....");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled");
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("거절됨 ");
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
