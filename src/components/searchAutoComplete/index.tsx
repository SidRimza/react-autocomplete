import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SearchAutoComplete.css';
import SearchInput from './SearchInput';
import SuggestionList from './SuggestionList';
import { setQuery, clearSuggestions } from '../../features/search/searchSlice';
import { fetchSuggestions } from '../../features/search/searchThunks';
import { useDebounce } from '../../hooks/useDebounce';
import { RootState, AppDispatch } from '../../app/store';

const SearchAutocomplete = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, suggestions, loading } = useSelector(
    (state: RootState) => state.search
  );

  const debouncedQuery = useDebounce(query);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      dispatch(clearSuggestions());
      return;
    }

    dispatch(fetchSuggestions(debouncedQuery));
  }, [debouncedQuery, dispatch]);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        setActiveIndex((i) => (i + 1) % suggestions.length);
        break;
      case "ArrowUp":
        setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
        break;
      case "Enter":
        if (activeIndex >= 0) {
          dispatch(setQuery(suggestions[activeIndex]));
        }
        break;
      case "Escape":
        dispatch(clearSuggestions());
        setActiveIndex(-1);
        break;
    }
  };

  return (
    <div className="search-wrapper">
      <SearchInput
        value={query}
        onChange={(val) => {
          dispatch(setQuery(val));

          if (!val.trim()) {
            dispatch(clearSuggestions());
          }
        }}
        onKeyDown={handleKeyDown}
      />

      {!loading && (
        <SuggestionList
          items={suggestions}
          query={query}
          activeIndex={activeIndex}
          onSelect={(value) => {
            dispatch(setQuery(value));
            dispatch(clearSuggestions());
            setActiveIndex(-1);
          }}
        />
      )}
    </div>
  );
};

export default SearchAutocomplete;
