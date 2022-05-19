require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { PORT } = process.env;
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('it works');
});

app.listen(PORT, console.log('server is running on port', PORT));
