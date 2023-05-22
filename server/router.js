'use strict';

const router = require('express').Router();

const broadcasterController = require('./controllers/broadcasterController');

router.get('/:broadcasterId/lists', broadcasterController.getAllLists);
router.get('/:broadcasterId/lists/:listName/games', broadcasterController.getAllGames);
router.post('/:broadcasterId/lists', broadcasterController.createNewList);
router.post('/:broadcasterId/lists/:listName/games', broadcasterController.addGame);
router.delete('/:broadcasterId/lists/:listId', broadcasterController.deleteList);
router.delete('/:broadcasterId/lists/:listId/games/:gameId', broadcasterController.deleteGame);
router.put('/:broadcasterId/lists/:listId/name', broadcasterController.updateListName);

module.exports = router;