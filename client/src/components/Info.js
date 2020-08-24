import React from 'react';

function Info(props) {
  return (
    <div className="Info">
      {' '}
      <span className="username">
        By:
        {` ${props.userEmail}`}
      </span>
      <span className="date">
        {` | ${props.timeAndDate}`}
      </span>
    </div>
  );
}

export default Info;
