import React, { useState } from 'react';
import axios from 'axios';

export default function Search(props) {
  // Sets input that user is inputing
  const [searchQuery, setSearchQuery] = useState('');

  // States wether search on server or not
  const [searchOnServer, setSearchOnServer] = useState(true);

  // Handles the select change
  function handleSelectChange() {
    setSearchOnServer(!searchOnServer);
    setSearchQuery('');
  }

  // Searches the database for item with same id
  async function searchById() {
    const result = await axios.get('/api/tickets', { query: { searchQuery } });
    console.log(result.data);
  }

  return (
    <div id="searchArea">
      <input
        id="searchInput"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        id="searchOptions"
        name="cars"
        onChange={handleSelectChange}
      >
        <option value="id" selected="selected">ID</option>
        <option value="title">title</option>
      </select>
      <button
        onClick={() => {
          searchOnServer ? props.filterTickets(searchQuery) : searchById();
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
