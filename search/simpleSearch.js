const {promisify} = require('util'); 

var redis = require("redis"),
    client = redis.createClient();
const getAsync = promisify(client.mget).bind(client);

function getPlayerDataById(id) {
  return getAsync([`player${id}`])
  .then(playerData => {
    console.log('data in getPlayerDataById-===', playerData);
    return playerData;
  })

}

module.exports = {getPlayerDataById}
