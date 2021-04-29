const path = require('path')
require('dotenv').config();
const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const transactions = require('./routes/transactions')
const connectDB = require('./config/db')
const app = express();
connectDB();

app.use(express.json());
app.use('/api/v1/transactions', transactions);


const port = process.env.PORT || 5000

if(process.env.NODE_ENV === "development"){
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static('clients/build'));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'clients', 'build', 'index.html')))
}

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold));
