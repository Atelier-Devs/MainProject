import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";

const initState = { email: "", password: "" };
//loginPost를 비동기함수로 처리하기 위해 redux에서 제공함
export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) =>
  loginPost(param)
);
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      console.log("login....");
      //action에서의 payload (실제 전송되는 데이터 )
      const data = action.payload;
      console.log("data :", data);
      return { email: data.email, password };
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
export const { login, logout } = loginSlice.actions; //destructuring
export default loginSlice.reducer;
