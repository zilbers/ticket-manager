import React, { useState } from 'react';

export default function Search(props) {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div id="searchArea">
      <input
        id="searchInput"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        onClick={() => {
          props.filterTickets(searchQuery);
          setSearchQuery('');
        }}
      >
        {' '}
        search
        {' '}
      </button>
    </div>
  );
}
