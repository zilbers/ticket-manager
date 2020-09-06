import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Info from './Info';
import './Ticket.css';

function Ticket(props) {
  const [hideButton, setHideButton] = useState(true);
  const [showBody, setShowBody] = useState(false);
  const { ticket } = props;
  const [done, setDone] = useState(ticket.done);

  return (
    <div
      className='ticket'
      onMouseEnter={() => setHideButton(false)}
      onMouseLeave={() => setHideButton(true)}
      onMouseOver={() => setHideButton(false)}
      onFocus={() => setHideButton(false)}
    >
      <span className='hideTicketButton' hidden={hideButton}>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='hide ticket'
          className='hideTicketButton'
          onClick={() => props.hideTicket(ticket)}
        >
          <CloseIcon />
        </IconButton>
      </span>

      <span className='header'>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='done'
          onClick={() => {
            props.markDone(ticket.id, done ? 'undone' : 'done');
            setDone((done) => !done);
          }}
        >
          {done ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
        </IconButton>
        <div
          className='title'
          onClick={() => setShowBody((showBody) => !showBody)}
        >
          {ticket.title}
        </div>
      </span>
      {showBody && (
        <div className='body'>
          <p className='content'>{ticket.content}</p>
        </div>
      )}
      <div className='infoAboutTicket'>
        <Info
          userEmail={ticket.userEmail}
          timeAndDate={props.timeAndDate(ticket.creationTime)}
        />
        <div className='labelContainer'>
          {' '}
          {ticket.labels &&
            ticket.labels.map((label) => (
              <span key={label} className='label'>
                {label}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Ticket;
