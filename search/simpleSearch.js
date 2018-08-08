const {promisify} = require('util');

let redis = require("redis"),
client = redis.createClient();
const getAsync = promisify(client.mget).bind(client);
let getAsyncList = promisify(client.lrange).bind(client);
let getAsyncLength = promisify(client.llen).bind(client);

function getPlayerDataById(playerId) {

  return getAsyncList(`player${playerId}`, 0, 1)
  .then(player => JSON.parse(player))
  .catch(err =>{ console.log(err)});;

}

function getPlayerDataByEventId(eventId, playerId) {
  return  getAsyncLength(`event${eventId}`)
   .then(length =>{
     return getAsyncList(`event${eventId}`, 0, length)
   })
   .then(events => {
     // return players.filter(player =>{
   // if ( player.playerId === playerId) {
   //   return JSON.parse(player)
   // }})
     // /\ equivalent higher order function /\
     let parsedPlayers = [];
     for (let i = 0; i < events.length; i++) {
       let playerInEvent = JSON.parse(events[i]);
       // console.log("playerInEvent", playerInEvent);
       if (playerInEvent.player_id === playerId) {
         console.log("success");
         parsedPlayers.push(playerInEvent)
       }
     }
     return parsedPlayers;
   })
   .catch(err =>{ console.log(err)});;
}
module.exports = { getPlayerDataById, getPlayerDataByEventId}
