const express = require('express');
const fs = require('fs').promises;

const app = express();
module.exports = app;
let requestID = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use('/', express.static('../client/build/'));

// Logger that describes activity on the server
function logger(req, res, next) {
  requestID += 1;
  console.log(`Request fired: ${req.url} 
Method: ${req.method}
Request #${requestID}
`);
  next();
}
app.use(logger);

//  Entry point that replies with the data of all the tickets saved
app.get('/api/tickets', async (req, res) => {
  try {
    const content = await fs.readFile('./data.json');
    const json = JSON.parse(content);
    res.send(json);
  } catch (error) {
    res.send(error);
  }
});
