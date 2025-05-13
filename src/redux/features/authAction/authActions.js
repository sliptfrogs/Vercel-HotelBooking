import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const register_url = import.meta.env.VITE_API_REGISTER;
const login_url = import.meta.env.VITE_API_LOGIN;
const protectRoute_url = import.meta.env.VITE_API_PROTECT_ROUTE;
export const AuthRegister = createAsyncThunk(
  "auth/AuthRegister",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("email", payload?.email || "");
      formData.append("password", payload?.password || "");
      formData.append("name", payload?.name || "");
      formData.append("phone", payload?.phone || "");
      formData.append("secretKey", payload?.secretKey || "");
      formData.append("userProfile", payload?.userProfile || "");
      const response = await axios.post(register_url, formData);
      if (!response.data.success) {
        return rejectWithValue({
          message: response.data.message || "Something went wrong",
          status: response.status || 500,
          statusMessage: "Internal Server Error",
        });
      }
      // Save new tokens if returned
      if (response.data.success) {
        sessionStorage.setItem("accessToken", response.data.accessToken);
      }
      if (response.data.user?.userId) {
        sessionStorage.setItem("userId", response.data.user.userId);
      }
      return response.data;
    } catch (error) {
      console.error("get error:", error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const AuthLogin = createAsyncThunk(
  "auth/AuthLogin",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(login_url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle API response
      if (!response.data.success) {
        return rejectWithValue({
          message: response.data.message || "Something went wrong",
          status: response.status || 500,
          statusMessage: "Internal Server Error",
        });
      }
      console.log('user',response.data.user.role);

      // const userRole = ['Manager','User','Superadmin'];

      // Save new tokens if returned
      if (response.data.success) {
        sessionStorage.setItem("accessToken", response.data.accessToken);
      }
      
      if (response.data.user) {
        sessionStorage.setItem("user-role", response.data.user.role);
        sessionStorage.setItem("user-name", response.data.user.name);
        sessionStorage.setItem("user-avatar", response.data.user.userAvatar);
        sessionStorage.setItem("user-status", response.data.user.status);
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response.data);

      // Handle network errors or missing response
      if (!error.response) {
        return rejectWithValue({
          message: "Network error, please try again",
          status: 503,
          statusMessage: "Service Unavailable",
        });
      }

      return rejectWithValue({
        message: error.response.data?.message || "Authentication failed",
        status: error.response.status || 500,
        statusMessage: error.response.statusText || "Internal Server Error",
      });
    }
  }
);
export const AuthProtectRoute = createAsyncThunk(
  "auth/AuthProtectRoute",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      if(!accessToken){
        if(!accessToken){

      }
      }
      const response = await axios.post(protectRoute_url, {
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${accessToken}`
      }
      });

      // Handle API response
      if (!response.data.success) {
        return rejectWithValue({
          message: response.data.message || "Something went wrong",
          status: response.status || 500,
          statusMessage: "Internal Server Error",
        });
      }
      console.log('user',response.data.user.role);
      // const userRole = ['Manager','User','Superadmin'];
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response.data);

      // Handle network errors or missing response
      if (!error.response) {
        return rejectWithValue({
          message: "Network error, please try again",
          status: 503,
          statusMessage: "Service Unavailable",
        });
      }

      return rejectWithValue({
        message: error.response.data?.message || "Authentication failed",
        status: error.response.status || 500,
        statusMessage: error.response.statusText || "Internal Server Error",
      });
    }
  }
);

const UserAuthSlice = createSlice({
  name:'user',
  initialState:{
    user:[],
    idle: "",

  },
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(AuthLogin.pending,(state)=>{
      state.idle = 'pending';
    }),
    builder.addCase(AuthLogin.fulfilled,(state,action)=>{
      state.idle = 'fulfilled';
      state.user = action.payload.user;
    }),
    builder.addCase(AuthLogin.rejected,(state,action)=>{
      state.idle = 'rejected'
    })
  }
})

export default UserAuthSlice.reducer;