import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSuggestions = createAsyncThunk<
  string[],
  string
>('search/fetchSuggestions', async (query, { signal }) => {
  const res = await fetch(
    `https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=10&format=json&origin=*`,
    { signal }
  );
  const data = await res.json();
  return data[1];
});
