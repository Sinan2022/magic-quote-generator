import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/features/auth/authSilce';
import usersReducer from '../components/features/users/usersSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});
export default store;
