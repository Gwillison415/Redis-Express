var redis = require("redis"),
    client = redis.createClient();
const {promisify} = require('util');
let getAsyncKeys = promisify(client.lrange).bind(client);
let getAsyncLength = promisify(client.llen).bind(client);
let flushDbAsync = promisify(client.flushdb).bind(client);

function createKvStore(data) {
  flushDbAsync( success => {
      console.log('db flushed');
  })
  .then(onceCleared =>{
    let dictionary = {}
    let count = 0;
    for (var i = 0; i < data.length; i++) {
      let player = data[i]['player_id']
      let event = data[i]['event_id']

      if (dictionary.player) {
        count++
        dictionary.player.push(data[i])
        client.rpush(`player${player}`, JSON.stringify(data[i]))
        client.rpush(`event${event}`, JSON.stringify(data[i]))
      } else {
        count++
        dictionary[player] = [data[i]]
        client.rpush(`player${player}`, JSON.stringify(data[i]))
        client.rpush(`event${event}`, JSON.stringify(data[i]))
      }

    }

    // getAsyncLength('event1947905')
    // .then(length =>{
    //   console.log("length", length);
    //   return length;
    // })
    // .then(length => {
    //   return getAsyncKeys('event1947905', 0, length)
    // })
    // .then(keys => {console.log(keys, "dirr");})
    // .catch(err =>{ console.log(err)});

    return dictionary;
  })

}

module.exports = { createKvStore };
