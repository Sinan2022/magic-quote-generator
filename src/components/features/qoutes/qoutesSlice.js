import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    addQuote: (state, action) => {
      state.push(action.payload);
    },
    editQuote: (state, action) => {
      const index = state.findIndex(quote => quote.id === action.payload.id);
      if (index !== -1) {
        state[index] = {...state[index], ...action.payload};
      }
    },
  },
});

export const { addQuote, editQuote } = quotesSlice.actions;
export const selectQuotes = state => state.quotes;
export default quotesSlice.reducer;
