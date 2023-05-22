'use strict';

const mongoose = require('mongoose');
const {uri} = require('../config');

(async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to the DB");
  } catch (error) {
    console.log("Error connecting to DB ", error);
  }
})();

module.exports = mongoose;