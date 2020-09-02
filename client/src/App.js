import React, { useState, useEffect } from 'react';
import { get, post, update, query } from './services/axios_service';
import Ticket from './components/Ticket';
import SearchAppBar from './components/SearchAppBar';
import './App.css';

function App() {
  // Gets ticket from server
  const [tickets, setTickets] = useState();

  // Array of all the showing tickets
  const [showingTickets, setShowingTickets] = useState();

  // Array of all the hidden tickets
  const [hiddenTickets, setHiddenTickets] = useState([]);

  // Hides tickets from view
  function hideTicket(ticket) {
    const currentHidden = hiddenTickets.slice();
    const currentShowing = showingTickets.slice();
    currentHidden.push(ticket);
    const index = currentShowing.indexOf(ticket);
    if (index > -1) {
      currentShowing.splice(index, 1);
    }
    console.log('Hiding ticket: ', currentHidden);
    setHiddenTickets(currentHidden);
    setShowingTickets(currentShowing);
  }

  // Combines hidden and presented tickets
  function restoreHidden() {
    console.log('Rrestoring tickets');
    setHiddenTickets([]);
    setShowingTickets(tickets);
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
    query(searchQuery).then((result) => {
      console.log(`Filter result by "${searchQuery}": `, result.data);
      setHiddenTickets([]);
      setTickets(result.data);
      setShowingTickets(result.data);
    });
  }

  // Marks ticket as done
  async function markDone(ticketId, status) {
    update(ticketId, status).then((result) => {
      console.log('Marked done / undone:', result);
    });
  }

  // Sends a new ticket to database
  async function sendTicket(ticketSent) {
    post(ticketSent).then((result) => {
      console.log(result);
      setTickets(result.data);
      console.log('sending ticket', ticketSent);
    });
  }

  // Loads the tickets when recieved from server
  useEffect(() => {
    const fetchData = async () => {
      get().then((result) => {
        console.log('Loading tickets from server: ', result.data);
        setTickets(result.data);
      });
    };
    fetchData();
  }, []);

  // Sets showing tickets when tickets changes
  useEffect(() => {
    setShowingTickets(tickets);
  }, [tickets]);

  return (
    <>
      {showingTickets && (
        <SearchAppBar
          hiddenTickets={hiddenTickets}
          tickets={showingTickets}
          filterTickets={(stringFilter) => filterTickets(stringFilter)}
          restoreHidden={restoreHidden}
          sendTicket={sendTicket}
        />
      )}
      <main id='ticketsShow'>
        {showingTickets &&
          showingTickets.map((ticket) => (
            <Ticket
              key={ticket.id}
              ticket={ticket}
              hideTicket={hideTicket}
              markDone={markDone}
              timeAndDate={(creationTime) => timeAndDate(creationTime)}
            />
          ))}
      </main>
    </>
  );
}

export default App;
