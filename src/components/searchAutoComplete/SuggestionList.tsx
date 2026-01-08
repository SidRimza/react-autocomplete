import React from 'react';
import { highlightMatch } from '../../utils/highlight';

interface Props {
  items: string[];
  query: string;
  activeIndex: number;
  onSelect: (value: string) => void;
}

const SuggestionList: React.FC<Props> = ({
  items,
  query,
  activeIndex,
  onSelect,
}) => {
  if (!items.length) return null;

  return (
    <ul className="dropdown" role="listbox">
      {items.map((item, index) => (
        <li
          key={item}
        //   role="option"
          className={`item ${index === activeIndex ? 'active' : ''}`}
          onMouseDown={() => onSelect(item)}
        >
          {highlightMatch(item, query)}
        </li>
      ))}
    </ul>
  );
};

export default React.memo(SuggestionList);
