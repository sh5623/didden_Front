import {DiddenAxiosInstance} from '../axios-instance/DiddenAxiosInstance';

export const ImageApi = {
  // 이미지 리스트
  getImageList() {
    return DiddenAxiosInstance.request({
      method: 'GET',
      url: '/main/content/images',
    });
  },
};
