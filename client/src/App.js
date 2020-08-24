import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from './components/Ticket';
import Search from './components/Search';
import './App.css';

function App() {
  // Gets ticket from server
  const [tickets, setTickets] = useState();

  // Translates creation time to date string
  function timeAndDate(creationTime) {
    const day = new Date(creationTime);
    const time = `${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`;
    const date = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
    return `${date}, ${time}`;
  }

  // Filters the showing tickets
  async function filterTickets(searchQuery) {
    const result = await axios.get(`/api/tickets?searchText=${searchQuery}`).then((res) => res);
    console.log(result.data);
    setTickets(result.data);
  }

  // Shows the unfiltered list
  // function unFilter() {
  //   setFilteredTickets(tickets.slice());
  // }

  // Loads the tickets when recieved from server
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/tickets');
      console.log(result.data);
      setTickets(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Search
        filterTickets={(stringFilter) => filterTickets(stringFilter)}
      />
      <main id="ticketsShow">
        {tickets && tickets.map((ticket) => (
          <Ticket
            key={ticket.id}
            ticket={ticket}
            timeAndDate={(creationTime) => timeAndDate(creationTime)}
          />
        ))}
      </main>
    </>
  );
}

export default App;
