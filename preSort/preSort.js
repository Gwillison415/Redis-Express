var redis = require("redis"),
    client = redis.createClient();
const {promisify} = require('util');


function createKvStore(data) {
  client.flushdb( success => {
      console.log('db flushed');
  })
  let dictionary = {}
  for (var i = 0; i < data.length; i++) {
    let player = data[i]['player_id']
    let event = data[i]['event_id']
    if (event === 1947905) {
        console.log('same event');
    }
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
  return dictionary;
}

module.exports = { createKvStore };
