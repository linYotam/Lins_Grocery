import React, { useState } from 'react';
import { Search } from '@mui/icons-material';

const SearchBtn = () => {
  const [showInput, setShowInput] = useState(false);

  const handleSearchClick = () => {
    setShowInput(prev => !prev);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      alert('Enter');
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        autoFocus
        placeholder="Enter search..."
        onKeyDown={handleKeyDown}
        className={`search__input ${showInput ? 'active' : ''}`}
      />
      <Search className="search__icon" onClick={handleSearchClick} />
    </div>
  );
};

export default SearchBtn;
