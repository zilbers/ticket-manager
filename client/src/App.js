import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from './components/Ticket';
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/tickets');
      console.log(result.data);
      setTickets(result.data);
    };
    fetchData();
  }, []);

  return (
    <main>
      {tickets && tickets.map((ticket) => (
        <Ticket
          key={ticket.id}
          ticket={ticket}
          timeAndDate={(creationTime) => timeAndDate(creationTime)}
        />
      ))}
    </main>
  );
}

export default App;
