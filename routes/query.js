const express = require('express');
const router = express.Router();
var redis = require("redis"),
    client = redis.createClient();


    
const {  getPlayerDataById } = require('../search/simpleSearch');
//
router.get('/', (req, res, next) => {
  // const playerId = Number.parseInt(req.params.playerId, 10);
console.log(req.query);
console.log(req.params);
  console.log('simple get to query/');
  res.sendStatus(200)
});

router.route('/player/:playerId')
 .get((req, res, next) => {
   console.log('inside player/:playerid');
  const playerId = Number.parseInt(req.params.playerId, 10);
  console.log(req.query);
  console.log(req.params);
  console.log("playerId", playerId);
  if (Number.isNaN(playerId)) {
    return next();
  }
  return getPlayerDataById(playerId)
    .then((playerData) => {
      console.log('resolved promisify', playerData);
      return res.status(200).send(playerData);
    })
    .catch((err) => {
      next(err);
    });
});
// router.get('/:playerId$:eventId', (req, res, next) => {
//   const playerId = Number.parseInt(req.params.playerId, 10);
//   const eventId = Number.parseInt(req.params.eventId, 10);
//
//   if (Number.isNaN(playerId)) {
//     return next();
//   }
//
//   return getPlayerDataById(playerId)
//     .then((channel) => {
//       res.status(200).send(channel);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });
module.exports = router;
