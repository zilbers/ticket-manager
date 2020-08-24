const express = require('express');
const fs = require('fs').promises;

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

//  Entry point that replies with the data of all the tickets saved
app.get('/api/tickets', async (req, res) => {
  try {
    const content = await fs.readFile('./data.json');
    let json = JSON.parse(content);
    if (req.query.searchText) {
      console.log('Query: ', req.query);
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
    console.log('Query params: ', req.params);
    json.forEach((ticket, index) => {
      if (ticket.id === ticketId) {
        json[index].done = true;
      }
    });
    await fs.writeFile('./data.json', `${JSON.stringify(json)}`);
    res.send('Updated');
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
    console.log('Query params: ', req.params);
    json.forEach((ticket, index) => {
      if (ticket.id === ticketId) {
        json[index].done = false;
      }
    });
    await fs.writeFile('./data.json', `${JSON.stringify(json)}`);
    res.send('Updated ticket');
  } catch (error) {
    res.send(error);
  }
});
