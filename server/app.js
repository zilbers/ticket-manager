const express = require('express');
const fs = require('fs').promises;
const { readFileSync } = require('fs');
const { uuid } = require('uuidv4');

const path = process.env.TEST_JSON || './data.json';

const app = express();
module.exports = app;
let requestID = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('../client/build/'));

// Logger that describes activity on the server
function logger(req, res, next) {
  console.log(`
Request #${requestID}
Request fired: ${req.url} 
Method: ${req.method}`);
  requestID += 1;
  next();
}
app.use(logger);

// Replies with searched tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const content = await fs.readFile(path);
    let json = JSON.parse(content);
    if (req.query.searchText) {
      console.log('Route param: ', req.query);
      json = json.filter((ticket) => {
        const title = ticket.title.toLowerCase();
        const searchQuery = req.query.searchText.toLowerCase();
        return title.includes(searchQuery);
      });
    }
    res.send(json);
  } catch (error) {
    res.send(error);
  }
});

// Marks ticket as done or undone
app.post('/api/tickets/:ticketId/:isDone', async (req, res) => {
  try {
    const content = await fs.readFile(path);
    const json = JSON.parse(content);
    const { ticketId, isDone } = req.params;
    console.log('Query param: ', req.params);
    console.log('Changing to:', isDone);
    let responseJson;
    const ticketIndex = json.findIndex((ticket) => ticket.id === ticketId);
    if (ticketIndex !== -1) {
      json[ticketIndex].done = isDone === 'done';
      responseJson = json[ticketIndex];
      responseJson.updated = true;
    }
    await fs.writeFile(path, `${JSON.stringify(json)}`);
    res.send(responseJson);
  } catch (error) {
    res.send(error);
  }
});

// Add ticket
app.post('/api/tickets', async (req, res) => {
  try {
    const date = new Date();
    const ticket = req.body;
    ticket.id = uuid();
    ticket.creationTime = date.getTime();
    console.log(ticket);
    const data = readFileSync(path);
    const dataJson = JSON.parse(data);
    dataJson.unshift(ticket);
    await fs.writeFile(path, `${JSON.stringify(dataJson)}`);
    res.send(dataJson);
  } catch (error) {
    res.send(error);
  }
});
