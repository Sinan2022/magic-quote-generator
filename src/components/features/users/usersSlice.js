import { createSlice } from '@reduxjs/toolkit';

// Initial state is an empty array
const initialState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    editUser: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addUser, editUser } = usersSlice.actions;
export default usersSlice.reducer;
