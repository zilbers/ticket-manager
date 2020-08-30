/* eslint-disable no-alert */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddCommentIcon from '@material-ui/icons/AddComment';
import IconButton from '@material-ui/core/IconButton';

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
  const [open, setOpen] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [labels, setLabels] = React.useState([]);
  const [addLabel, setAddLabel] = React.useState('');
  const [error, setErorr] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setUserEmail('');
    setTitle('');
    setContent('');
    setAddLabel('');
    setLabels([]);
    setOpen(false);
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
      <IconButton
        id='addTicket'
        edge='start'
        className={classes.menuButton}
        color='inherit'
        aria-label='add ticket'
        onClick={handleOpen}
      >
        <AddCommentIcon />
      </IconButton>

      <Modal
        aria-labelledby='add-comment-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {error && (
              <span id='formError' style={{ color: 'red' }}>
                Make sure that everything is correct!
              </span>
            )}
            <form id='addTicketForm'>
              <fieldset id='ticketFieldSet' className={classes.form}>
                <h3 id='add-ticket-title'>Add ticket</h3>
                <label htmlFor='userEmail'>Email:</label>
                <input
                  type='email'
                  id='userEmail'
                  name='userEmail'
                  value={userEmail}
                  onChange={(event) =>
                    handleChange(setUserEmail, event.target.value)
                  }
                />

                <label htmlFor='title'>Title:</label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  value={title}
                  onChange={(event) =>
                    handleChange(setTitle, event.target.value)
                  }
                />

                <label htmlFor='content'>Cotent:</label>
                <textarea
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
                  <label htmlFor='labels'>Labels:</label>
                  {labels.map((label) => (
                    <span key={label} className='labelsForm'>
                      {label}
                    </span>
                  ))}
                </span>
                <span id='spanLabels'>
                  <input
                    type='text'
                    id='labels'
                    name='labels'
                    value={addLabel}
                    onChange={(event) => setAddLabel(event.target.value)}
                  />
                  <button onClick={(event) => addToLabels(event)}>Add</button>
                </span>

                <input
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
