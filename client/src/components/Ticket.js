import React from 'react';

function Ticket(props) {
  const { ticket } = props;
  return (
    <div className="ticket">
      <h4 className="ticketTitle">{ticket.title}</h4>
    </div>
  );
}

export default Ticket;
