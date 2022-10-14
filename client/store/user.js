import axios from "axios"
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"

export const sendLoginRequest = createAsyncThunk("LOGIN", (data) => {
  return axios
    .post(`http://localhost:8080/api/user/login`, data)
    .then((r) => r.data)
    .catch((err) => console.error("Something happened in loginRequest", err))
})

export const sendLoginGoogle = createAsyncThunk("LOGIN_GOOGLE", (data) => {
  return data
})
export const sendLogOutRequest = createAsyncThunk("LOGOUT", (data) => {
  return axios
    .post(`http://localhost:8080/api/user/logout`)
    .then((r) => r.data)
    .catch((err) => console.error(err))
})

const userReducer = createReducer(
  {},
  {
    [sendLoginRequest.fulfilled]: (state, action) => action.payload,
    [sendLoginGoogle.fulfilled]: (state, action) => action.payload,
    [sendLogOutRequest.fulfilled]: (state, action) => action.payload,
  }
)

export default userReducer
