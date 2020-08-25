const express = require('express');
const fs = require('fs').promises;
const { uuid } = require('uuidv4');

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
    const content = await fs.readFile('./data.json');
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

// Marks ticket as done
app.post('/api/tickets/:ticketId/done', async (req, res) => {
  try {
    const content = await fs.readFile('./data.json');
    const json = JSON.parse(content);
    const { ticketId } = req.params;
    console.log('Query param: ', req.params);
    console.log('Done', true);
    let responseJson;
    json.forEach((ticket, index) => {
      if (ticket.id === ticketId) {
        json[index].done = true;
        responseJson = json[index];
      }
    });
    await fs.writeFile('./data.json', `${JSON.stringify(json)}`);
    res.send(responseJson);
  } catch (error) {
    res.send(error);
  }
});

// Marks ticket as undone
app.post('/api/tickets/:ticketId/undone', async (req, res) => {
  try {
    const content = await fs.readFile('./data.json');
    const json = JSON.parse(content);
    const { ticketId } = req.params;
    console.log('Query param: ', req.params);
    console.log('Done', false);
    let responseJson;
    json.forEach((ticket, index) => {
      if (ticket.id === ticketId) {
        json[index].done = false;
        responseJson = json[index];
        responseJson.updated = true;
      }
    });
    await fs.writeFile('./data.json', `${JSON.stringify(json)}`);
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
    const data = await fs.readFile('./data.json');
    const dataJson = JSON.parse(data);
    dataJson.push(ticket);
    await fs.writeFile('./data.json', `${JSON.stringify(dataJson)}`);
    res.send(dataJson);
  } catch (error) {
    res.send(error);
  }
});
