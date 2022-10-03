import {DiddenAxiosInstance} from '../axios-instance/DiddenAxiosInstance';

export const LoginApi = {
  // 로그인 요청
  postRequestLogin(userEmail, userPassword) {
    return DiddenAxiosInstance.request({
      method: 'POST',
      url: '/login',
      data: {
        userEmail,
        userPassword,
      },
    });
  },
};
