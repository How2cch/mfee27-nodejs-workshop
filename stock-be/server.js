const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.SERVER_PORT;

app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.listen(port, () => {
  console.log(`Server start at ${port}`);
});
