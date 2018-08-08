var redis = require("redis"),
    client = redis.createClient();
const {promisify} = require('util');
let getAsyncKeys = promisify(client.lrange).bind(client);

function createKvStore(data) {
  console.log('creating');
  let dictionary = {}
  for (var i = 0; i < data.length; i++) {
    let player = data[i]['player_id']
    let event = data[i]['event_id']
    if (dictionary.player) {
      dictionary.player.push(data[i])
      client.rpush(`player${player}`, JSON.stringify(data[i]))
      client.rpush(`event${event}`, JSON.stringify(data[i]))
    } else {
      dictionary[player] = [data[i]]
      client.rpush(`player${player}`, JSON.stringify(data[i]))
      client.rpush(`event${event}`, JSON.stringify(data[i]))
    }

  }
  getAsyncKeys('event1947905', 0, -1).then(keys => {console.log(keys, "dirr");}).catch(err =>{ console.log(err)});
  return dictionary;
}

module.exports = { createKvStore };
