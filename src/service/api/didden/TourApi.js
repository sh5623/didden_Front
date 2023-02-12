import {DiddenAxiosInstance} from '../axios-instance/DiddenAxiosInstance';

export const TourApi = {
  // Tour List
  getTourList(cat1, cat2, cat3, keyword) {
    return DiddenAxiosInstance.request({
      method: 'GET',
      url: '/tour/api/info/searchKeyword',
      params: {
        cat1,
        cat2,
        cat3,
        keyword,
      },
    });
  },
};
