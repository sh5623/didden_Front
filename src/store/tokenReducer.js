import {createSlice} from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    login_id: '',
    token_acc: '',
    token_ref: '',
  },
  reducers: {
    setLoginId: (state, action) => {
      state.login_id = action.payload;
    },
    setTokenAcc: (state, action) => {
      state.token_acc = action.payload;
    },
    setTokenRef: (state, action) => {
      state.token_ref = action.payload;
    },
  },
});

export const {setLoginId, setTokenAcc, setTokenRef} = tokenSlice.actions;
export default tokenSlice.reducer;
export const selectLoginId = state => state.token.login_id;
export const selectTokenAcc = state => state.token.token_acc;
export const selectTokenRef = state => state.token.token_ref;
