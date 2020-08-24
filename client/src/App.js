import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from './components/Ticket';
import SearchAppBar from './components/SearchAppBar';
import './App.css';

function App() {
  // Gets ticket from server
  const [tickets, setTickets] = useState();

  //  Array of all the hidden tickets
  const [hiddenTickets, setHiddenTickets] = useState([]);

  // Hides tickets from view
  function hideTicket(ticket) {
    const currentHidden = hiddenTickets.slice();
    const currentShowing = tickets.slice();
    currentHidden.push(ticket);
    const index = currentShowing.indexOf(ticket);
    if (index > -1) {
      currentShowing.splice(index, 1);
    }
    console.log(currentHidden);
    setHiddenTickets(currentHidden);
    setTickets(currentShowing);
  }
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
    setHiddenTickets([]);
    setTickets(result.data);
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

  return (
    <>
      { tickets && (
        <SearchAppBar
          hiddenTickets={hiddenTickets}
          tickets={tickets}
          filterTickets={(stringFilter) => filterTickets(stringFilter)}
        />
      )}
      <main id="ticketsShow">
        {tickets && tickets.map((ticket) => (
          <Ticket
            key={ticket.id}
            ticket={ticket}
            hideTicket={hideTicket}
            timeAndDate={(creationTime) => timeAndDate(creationTime)}
          />
        ))}
      </main>
    </>
  );
}

export default App;
