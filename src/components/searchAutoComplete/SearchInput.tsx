import React, { memo } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<Props & {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}> = ({ value, onChange, onKeyDown }) => (
  <input
    className="search-input"
    value={value}
    onChange={e => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    placeholder="Search Wikipedia..."
    aria-autocomplete="list"
  />
);


export default memo(SearchInput);
