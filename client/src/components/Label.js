import React from 'react';

function Label(props) {
  const { label } = props;
  return (
    <span className="label">{label}</span>
  );
}

export default Label;
