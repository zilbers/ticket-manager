import React, { useState } from 'react';
import axios from 'axios';

export default function Search(props) {
  // Sets input that user is inputing
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
