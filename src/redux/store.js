import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/features/auth/authSilce';
import usersReducer from '../components/features/users/usersSlice';
import quotesReducer from '../components/features/qoutes/qoutesSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    quotes: quotesReducer,
  },
});
export default store;
