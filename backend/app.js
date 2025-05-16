const express = require('express');
const cors = require('cors');
const libraryRoutes = require('./routes/libraryItems');
const serviceRoutes = require('./routes/servicePlans');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/library', libraryRoutes);
app.use('/api/services', serviceRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

module.exports = app;
