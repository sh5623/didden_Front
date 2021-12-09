import {createSlice} from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    login_id: '',
    token_acc: '',
    token_ref: '',
    kakao_token_acc: '',
    kakao_token_ref: '',
    kakao_user_email: '',
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
    setKakaoTokenAcc: (state, action) => {
      state.kakao_token_acc = action.payload;
    },
    setKakaoTokenRef: (state, action) => {
      state.kakao_token_ref = action.payload;
    },
    setKakaoUserEmail: (state, action) => {
      state.kakao_user_email = action.payload;
    },
  },
});

export const {
  setLoginId,
  setTokenAcc,
  setTokenRef,
  setKakaoTokenAcc,
  setKakaoTokenRef,
  setKakaoUserEmail,
} = tokenSlice.actions;
export default tokenSlice.reducer;
export const selectLoginId = state => state.token.login_id;
export const selectTokenAcc = state => state.token.token_acc;
export const selectTokenRef = state => state.token.token_ref;
export const selectKakaoTokenAcc = state => state.token.kakao_token_acc;
export const selectKakaoTokenRef = state => state.token.kakao_token_ref;
export const selectKakaoUserEmail = state => state.token.kakao_user_email;
