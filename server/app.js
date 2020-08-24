const express = require('express');
const fs = require('fs').promises;

const app = express();
let requestID = 0;

module.exports = app;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use('/', express.static('../client/build/'));

function logger(req, res, next) {
  requestID += 1;
  console.log(`Request fired: ${req.url} 
Method: ${req.method}
Request #${requestID}
`);
  next();
}

app.use(logger);

app.get('api/tickets/', async (req, res) => {
  try {
    const content = await fs.readFile('./data.json');
    const json = JSON.parse(content);
    res.send(json);
  } catch (error) {
    res.send(error);
  }
});
