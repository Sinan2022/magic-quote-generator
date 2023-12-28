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
      const index = state.findIndex(user => user.email === action.payload.email);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addUser, editUser } = usersSlice.actions;
export const selectUsers = state => state.users;
export default usersSlice.reducer;

