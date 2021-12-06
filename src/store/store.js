import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './counterReducer';
import tokenReducer from './tokenReducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
    token: tokenReducer,
  },
});
