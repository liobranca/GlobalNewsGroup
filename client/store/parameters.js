import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

const initialValue = {
  stack: 1,
  intervalo: 1,
};

export const newConfig = createAsyncThunk("NEW_CONFIG", (data) => {
  return data;
});

const parametersReducer = createReducer(initialValue, {
  [newConfig.fulfilled]: (state, action) => action.payload,
});

export default parametersReducer;
