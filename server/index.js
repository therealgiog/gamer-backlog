'use strict';

const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./router');

const app = express();
app.use(cors());
app.use(express.json()); // Parse incoming JSON payloads

app.use('/api', router); // Mount the router

// Serve static files from the "client" directory
app.use(express.static(path.join(__dirname, '../client/build')));
// Serve the static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



