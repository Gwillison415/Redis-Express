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

  if (Number.isNaN(playerId)) {
    return next();
  }
  if (eventId) {
    console.time("getPlayerDataByEventId")
    return getPlayerDataByEventId( eventId, playerId)
    .then(playersByEventData => {
      console.log("playersByEventData",playersByEventData);
      console.timeEnd("getPlayerDataByEventId")
      return res.status(200).send(playersByEventData);
    });
  } else {
  console.time("getPlayerDataById")
    return getPlayerDataById(playerId)
    .then((playerData) => {
      console.timeEnd("getPlayerDataById")
      return res.status(200).send(playerData);
    })
    .catch((err) => {
      next(err);
    });
  };
});

module.exports = router;
