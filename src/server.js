// Variables

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const adRouter = require('./routes/adRoutes');
const catRouter = require('./routes/catRoutes');

const { PORT } = process.env;
const app = express();

// Middleware

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes

app.use('/auth', authRouter);
app.use('/adverts', adRouter);
app.use('/categories', catRouter);

// Server launch

app.listen(PORT, console.log('server is running on port', PORT));
