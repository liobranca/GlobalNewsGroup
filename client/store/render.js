import {
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";


export const switchRender = createAsyncThunk("RENDER", (data) => {
    return data
  });
  

const switchReducer = createReducer(
    false,
    {
        [switchRender.fulfilled]: (state, action) => action.payload,
    }
  );
  
  export default switchReducer;
  