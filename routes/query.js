const express = require('express');
const router = express.Router();
var redis = require("redis"),
    client = redis.createClient();



const {  getPlayerDataById, getPlayerDataByEventId } = require('../search/simpleSearch');
//
// router.get('/', (req, res, next) => {
//   // const playerId = Number.parseInt(req.params.playerId, 10);
// console.log(req.query);
// console.log(req.params);
//   console.log('simple get to query/');
//   res.sendStatus(200)
// });

router.get('/', (req, res, next) => {
   console.log('inside player/:playerid');
  const playerId = Number.parseInt(req.query.playerId, 10);
  const eventId = Number.parseInt(req.query.eventId, 10);
  console.log('req.query', req.query);
  console.log('req.params' ,req.params);
  console.log("playerId", playerId, "eventId", eventId);
  if (Number.isNaN(playerId)) {
    return next();
  }
  if (eventId) {
    return getPlayerDataByEventId( eventId, playerId)
    .then(playersByEventData => {
      console.log("playersByEventData",playersByEventData);
      return res.status(200).send(playersByEventData);
    });
  } else {

    return getPlayerDataById(playerId)
    .then((playerData) => {
      console.log('resolved promisify', playerData);
      return res.status(200).send(playerData);
    })
    .catch((err) => {
      next(err);
    });
  };
});

module.exports = router;
