'use strict';

const mongooseDB = require('./db');

const gameSchema = new mongooseDB.Schema({
  title: {
    type: String,
    required: true
  }
});

const gameListSchema = new mongooseDB.Schema({
  listName: {
    type: String,
    required: true
  },
  games: [gameSchema]
});

const broadcasterSchema = new mongooseDB.Schema({
  broadcasterId: {
    type: String,
    required: true
  },
  lists: [gameListSchema]
});

const Broadcaster = mongooseDB.model('Broadcaster', broadcasterSchema);

module.exports = Broadcaster;