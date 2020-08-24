import React, { useState } from 'react';
import Label from './Label';
import Info from './Info';
import './Ticket.css';

function Ticket(props) {
  const [hideButton, setHideButton] = useState(true);
  const { ticket } = props;

  return (
    <div
      className="ticket"
      onMouseEnter={() => setHideButton(false)}
      onMouseLeave={() => setHideButton(true)}
    >
      <span
        className="hideTicketButton"
        hidden={hideButton}
        onClick={() => props.hideTicket(ticket)}
      >
        Hide
      </span>
      <div className="body">
        <h4 className="title">{ticket.title}</h4>
        <p className="content">{ticket.content}</p>
      </div>
      <div className="infoAboutTicket">
        <Info userEmail={ticket.userEmail} timeAndDate={props.timeAndDate(ticket.creationTime)} />
        <div className="labelContainer">
          {' '}
          {ticket.labels && ticket.labels.map((label) => (
            <Label
              key={label}
              label={label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ticket;
