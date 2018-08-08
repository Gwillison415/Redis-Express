
const express = require('express');
const bodyParser = require('body-parser');
const RedisServer = require('redis-server');

const jsonData = require('./data')
const {createKvStore} = require('./preSort/preSort')
require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  require('dotenv').config();
}
const app = express();
const port = process.env.PORT || 8002;
const server = new RedisServer({
  port: 6379,
  bin: '/usr/local/bin/redis-server'});

const query = require('./routes/query');
let dataByPlayerId = {}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

server.open((err) => {
  if (err === null) {
    // You may now connect a client to the Redis
    // server bound to port 6379.
    console.log('redis err===', err);

  }
  console.log("You may now connect a client to the Redis server bound to port 6379");
});

// app.use( '/' ,(req, res) =>{
//   console.log("req", req);
//   res.sendStatus(201)
// })
app.use('/query', query);
app.listen(port, () => {
  if (app.get('env') !== 'test') {
    /* eslint-disable no-console */
    console.log('Listening on port', port);
    console.time('CreateKeyValueStore')
    createKvStore(jsonData)
    console.log("Key Value store created");
    console.timeEnd('CreateKeyValueStore')
    // console.log(dataByPlayerId);
  }
});
module.exports = { dataByPlayerId};
