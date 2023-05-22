'use strict';

const Broadcaster = require('../models/broadcasterModel');

// GET all lists for a broadcaster
//router.get('/:broadcasterId/lists',
exports.getAllLists = async (req, res) => {
  const { broadcasterId } = req.params;
  try {
    let broadcaster = await Broadcaster.findOne({ broadcasterId });
    if (!broadcaster) {
      broadcaster = new Broadcaster({ broadcasterId });
      await broadcaster.save();
    }
    res.status(200).json(broadcaster.lists);
  } catch (err) {
    //console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET all games from a list
//router.get('/:broadcasterId/lists/:listId/games',
exports.getAllGames = async (req, res) => {
  const { broadcasterId, listName } = req.params;
  try {
    const broadcaster = await Broadcaster.findOne({broadcasterId});
    if (!broadcaster) {
      return res.status(404).json({ message: 'Broadcaster not found' });
    }
    const listIndex = broadcaster.lists.findIndex(list => list.listName === listName);
    const games = broadcaster.lists[listIndex].games;
    res.status(200).json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST create a new list for a broadcaster
//router.post('/:broadcasterId/lists',
exports.createNewList = async (req, res) => {
  const { broadcasterId } = req.params;
  try {
    let broadcaster = await Broadcaster.findOne({ broadcasterId });
    const newList = { listName: req.body.listName, games: [] };
    broadcaster.lists.push(newList);
    await broadcaster.save();
    res.status(201).json(newList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST add a game to a list
//router.post('/:broadcasterId/lists/:listId/games',
exports.addGame = async (req, res) => {
  const {broadcasterId, listName} = req.params;
  try {
    let broadcaster = await Broadcaster.findOne({broadcasterId});
    if (!broadcaster) {
      return res.status(404).json({ message: 'Broadcaster not found' });
    }
    const listIndex = broadcaster.lists.findIndex(list => list.listName === listName);
    const newGame = {title: req.body.gameTitle};
    broadcaster.lists[listIndex].games.push(newGame)
    await broadcaster.save();
    res.status(201).json(newGame);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE a list
//router.delete('/:broadcasterId/lists/:listId',
exports.deleteList = async (req, res) => {
  try {
    const broadcaster = await Broadcaster.findById(req.params.broadcasterId);
    if (!broadcaster) {
      return res.status(404).json({ message: 'Broadcaster not found' });
    }
    const list = broadcaster.lists.id(req.params.listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    list.remove();
    await broadcaster.save();
    res.status(204).json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE a game from a list
//router.delete('/:broadcasterId/lists/:listId/games/:gameId',
exports.deleteGame = async (req, res) => {
  try {
    const broadcaster = await Broadcaster.findById(req.params.broadcasterId);
    if (!broadcaster) {
      return res.status(404).json({ message: 'Broadcaster not found' });
    }
    const list = broadcaster.lists.id(req.params.listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    const game = list.games.id(req.params.gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    game.remove();
    await broadcaster.save();
    res.status(204).json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


// PUT update list name
//router.put('/:broadcasterId/lists/:listId/name',
exports.updateListName = async (req, res) => {
  try {
    const broadcaster = await Broadcaster.findById(req.params.broadcasterId);
    if (!broadcaster) {
      return res.status(404).json({ message: 'Broadcaster not found' });
    }
    const list = broadcaster.lists.id(req.params.listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    list.name = req.body.name;
    await broadcaster.save();
    res.status(204).json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


