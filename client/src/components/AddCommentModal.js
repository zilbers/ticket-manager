/* eslint-disable no-alert */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    display: 'flex',
    border: 'none',
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.openModal);
  const [userEmail, setUserEmail] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [labels, setLabels] = React.useState([]);
  const [addLabel, setAddLabel] = React.useState('');
  const [error, setErorr] = React.useState(false);

  const handleClose = () => {
    setUserEmail('');
    setTitle('');
    setContent('');
    setAddLabel('');
    setLabels([]);
    props.setOpenModal(false);
    setErorr(false);
  };

  const handleChange = (setter, value) => {
    setter(value);
  };

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validateInput(text) {
    return text === undefined || text === '';
  }

  function addToLabels(event) {
    event.preventDefault();
    let newLabels = labels.slice();
    console.log(newLabels, labels);
    if (!(addLabel === undefined || addLabel === '')) {
      newLabels.push(addLabel);
      setLabels(newLabels);
      setAddLabel('');
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby='add-comment-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={props.openModal}
        onClose={() => {
          handleClose();
          props.handleMenuClose();
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.openModal}>
          <div className={classes.paper}>
            {error && (
              <span id='formError' style={{ color: 'red' }}>
                Make sure that everything is correct!
              </span>
            )}
            <form id='addTicketForm'>
              <fieldset id='ticketFieldSet' className={classes.form}>
                <h3 id='add-ticket-title'>Add ticket</h3>
                <label htmlFor='userEmail' className='formItem'>
                  Email:
                </label>
                <input
                  className='formItem'
                  type='email'
                  id='userEmail'
                  name='userEmail'
                  value={userEmail}
                  onChange={(event) =>
                    handleChange(setUserEmail, event.target.value)
                  }
                />

                <label htmlFor='title' className='formItem'>
                  Title:
                </label>
                <input
                  className='formItem'
                  type='text'
                  id='title'
                  name='title'
                  value={title}
                  onChange={(event) =>
                    handleChange(setTitle, event.target.value)
                  }
                />

                <label htmlFor='content' className='formItem'>
                  Cotent:
                </label>
                <textarea
                  className='formItem'
                  id='content'
                  name='content'
                  rows='10'
                  cols='50'
                  value={content}
                  onChange={(event) =>
                    handleChange(setContent, event.target.value)
                  }
                />

                <span>
                  <label htmlFor='labels' className='formItem'>
                    Labels:
                  </label>
                  {labels.map((label) => (
                    <span key={label} className='labelsForm'>
                      {label}
                    </span>
                  ))}
                </span>

                <span>
                  <input
                    className='formItem'
                    type='text'
                    id='labels'
                    name='labels'
                    value={addLabel}
                    onChange={(event) => setAddLabel(event.target.value)}
                  />
                  <button
                    className='formItem'
                    onClick={(event) => addToLabels(event)}
                  >
                    Add
                  </button>
                </span>

                <input
                  className='formItem'
                  id='submitButton'
                  type='button'
                  value='submit'
                  onClick={(event) => {
                    event.preventDefault();
                    if (
                      !validateEmail(userEmail) ||
                      validateInput(title) ||
                      validateInput(content)
                    ) {
                      setErorr(true);
                      return;
                    }
                    handleClose();
                    props.sendTicket({
                      userEmail,
                      title,
                      content,
                      labels,
                    });
                  }}
                />
              </fieldset>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
