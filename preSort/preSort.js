var redis = require("redis"),
    client = redis.createClient();
const { promisify } = require('util');
const {  mergeSort,
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort} = require('../sort/sortingAlgorithms')

function createKvStore(data) {
  client.flushdb( success => {
      console.log('db flushed');
  })
  let dictionary = {}
  let array = [];
  for (var i = 0; i < data.length; i++) {
    let player = data[i]['player_id']
    let event = data[i]['event_id']

    client.rpush(`player${player}`, JSON.stringify(data[i]))
    client.rpush(`event${event}`, JSON.stringify(data[i]))

  }
  return true;
}
function createDictionaryDS(data) {
  console.time('createDictionaryDS')
  let dictionary = {}
  for (var i = 0; i < data.length; i++) {
    let player = data[i]['player_id']
    let event = data[i]['event_id']
    if (dictionary.player) {
      dictionary.player.push(data[i])
    } else {
      dictionary[player] = [data[i]]
    }
  }

  console.timeEnd('createDictionaryDS')
  return dictionary;
}

function createMergeSortedArray(json) {
  console.time('createMergeSortedArray')
  mergeSort(json)
  console.timeEnd('createMergeSortedArray')
}
function createbubbleSortedArray(json) {
  console.time('createbubbleSortedArray')
  bubbleSort(json)
  console.timeEnd('createbubbleSortedArray')
}
function createSelectionSortedArray(json) {
  console.time('createSelectionSortedArray')
  selectionSort(json)
  console.timeEnd('createSelectionSortedArray')
}
function createInsertionSortedArray(json) {
  console.time('createInsertionSortedArray')
  insertionSort(json)
  console.timeEnd('createInsertionSortedArray')
}
function createquickSortedArray(json) {
  console.time('createquickSortedArray')
  quickSort(json)
  console.timeEnd('createquickSortedArray')
}

module.exports = { createKvStore, createMergeSortedArray, createbubbleSortedArray, createSelectionSortedArray, createInsertionSortedArray, createquickSortedArray };
