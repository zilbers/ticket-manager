import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from './components/Ticket';
import './App.css';

function App() {
  // Gets ticket from server
  const [tickets, setTickets] = useState();

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
      {tickets && tickets.map((ticket) => <Ticket ticket={ticket} />)}
    </main>
  );
}

export default App;
