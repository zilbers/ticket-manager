import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from './components/Ticket';
import Search from './components/Search';
import './App.css';

function App() {
  // Gets ticket from server
  const [tickets, setTickets] = useState();

  // List of filtered tickets
  const [filteredTickets, setFilteredTickets] = useState();

  // Translates creation time to date string
  function timeAndDate(creationTime) {
    const day = new Date(creationTime);
    const time = `${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`;
    const date = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
    return `${date}, ${time}`;
  }

  // Filters the showing tickets
  function filterTickets(searchQuery) {
    const filteredList = [];
    filteredTickets.forEach((item, i) => {
      const ticketTitle = item.title.toLowerCase();
      if (ticketTitle.includes(searchQuery.toLowerCase())) {
        filteredList.push(item);
      }
    });
    console.log(filteredList);
    setFilteredTickets(filteredList);
  }

  // Shows the unfiltered list
  function unFilter() {
    setFilteredTickets(tickets.slice());
  }

  // Loads the tickets when recieved from server
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/tickets');
      console.log(result.data);
      setTickets(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredTickets(tickets);
  }, [tickets]);

  return (
    <>
      <Search filterTickets={(stringFilter) => filterTickets(stringFilter)} />
      <main id="ticketsShow">
        {filteredTickets && filteredTickets.map((ticket) => (
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
