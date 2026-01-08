import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSuggestions } from './searchThunks';
import { SearchState } from './searchTypes';

const initialState: SearchState = {
  query: '',
  suggestions: [],
  loading: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearSuggestions: state => {
      state.suggestions = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSuggestions.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
        state.loading = false;
      })
      .addCase(fetchSuggestions.rejected, state => {
        state.loading = false;
      });
  },
});

export const { setQuery, clearSuggestions } = searchSlice.actions;
export default searchSlice.reducer;
