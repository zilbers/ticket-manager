import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Label from './Label';
import Info from './Info';
import './Ticket.css';

function Ticket(props) {
  const [hideButton, setHideButton] = useState(true);
  const [showBody, setShowBody] = useState(true);
  const { ticket } = props;

  return (
    <div
      className="ticket"
      onMouseEnter={() => setHideButton(false)}
      onMouseLeave={() => setHideButton(true)}
      onMouseOver={() => setHideButton(false)}
      onFocus={() => setHideButton(false)}
    >
      <span className="hideTicketButton" hidden={hideButton}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="hide ticket"
          className="hideTicketButton"
          onClick={() => props.hideTicket(ticket)}
        >
          <CloseIcon />
        </IconButton>
      </span>

      <h4 className="title" onClick={() => setShowBody(!showBody)}>{ticket.title}</h4>
      <div className="body" hidden={showBody}>
        <p className="content">{ticket.content}</p>
        <div className="infoAboutTicket">
          <Info
            userEmail={ticket.userEmail}
            timeAndDate={props.timeAndDate(ticket.creationTime)}
          />
          <div className="labelContainer">
            {' '}
            {ticket.labels
            && ticket.labels.map((label) => <Label key={label} label={label} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
