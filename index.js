const express = require('express');
const bodyParser = require('body-parser');
const RedisServer = require('redis-server');
const query = require('./routes/query');
const sorting = require('./routes/sorting');

const jsonData = require('./data')
const {createKvStore, createDictionaryDS
} = require('./preSort/preSort')
require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  require('dotenv').config();
}

const app = express();
const port = process.env.PORT || 8002;
const redisPort = process.env.REDIS_PORT || 6379;
const server = new RedisServer({port: redisPort, bin: process.env.REDIS_BINARY_LOCATION});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

server.open((err) => {
  if (err === null) {
    // You may now connect a client to the Redis
    // server bound to port 6379.
    console.error('redis err===', err);

  }
  console.log(`You may now connect a client to the Redis server bound to port ${redisPort}`);
});

app.use('/query', query);
app.use('/sorting', sorting);

app.get('/testsorting', (req, res) => {
  // TODO run all routes
})
app.listen(port, () => {
  if (app.get('env') !== 'test') {
    console.log('Listening on port', port);
    console.time('Exit listen function')
    createKvStore(jsonData)
    createDictionaryDS(jsonData)
    console.log("Key Value store created");
    console.timeEnd('Exit listen function')
  }
});
