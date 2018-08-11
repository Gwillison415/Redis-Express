const express = require('express');
const router = express.Router();
const jsonData = require('../data')
const {linearSearch, binarySearch, binarySearchRecursive} = require('../search/arraySearch')
const {mergeSort, bubbleSort, selectionSort, insertionSort, quickSort} = require('../sort/sortingAlgorithms')

router.get('/bubbleSort', (req, res) => {
  console.time('bubbleSortRoute')
  const playerId = Number.parseInt(req.query.playerId, 10);
  let searchType = req.query.searchType;
  console.log('searchType', searchType);
  let sortedArray = bubbleSort(jsonData, 'player_id');
  if (searchType = 'binary') {
    var returnValue = binarySearch(sortedArray, 338365)
  } else if (searchType = 'binaryRecursive') {
    var returnValue = binarySearchRecursive(sortedArray, 338365)
  } else if (searchType = 'linear') {
    var returnValue = linearSearch(sortedArray, 338365)
  } else {
    return res.sendStatus(400);
  }  console.timeEnd('bubbleSortRoute')
  return res.status(200).send(returnValue)
})
router.get('/mergeSort', (req, res) => {
  console.time('mergeSortRoute')
  const playerId = Number.parseInt(req.query.playerId, 10);
  let searchType = req.query.searchType;
  let sortedArray = mergeSort(jsonData, 'player_id');
  if (searchType = 'binary') {
    let returnValue = binarySearch(sortedArray, 338365)
  } else if (searchType = 'binaryRecursive') {
    var returnValue = binarySearchRecursive(sortedArray, 338365)
  } else if (searchType = 'linear') {
    var returnValue = linearSearch(sortedArray, 338365)
  } else {
    return res.sendStatus(400);
  }  console.timeEnd('mergeSortRoute')
  return res.status(200).send(returnValue)
})
router.get('/selectionSort', (req, res) => {
  console.time('selectionSortRoute')
  const playerId = Number.parseInt(req.query.playerId, 10);
  let searchType = req.query.searchType;

  let sortedArray = selectionSort(jsonData, 'player_id');
  if (searchType = 'binary') {
    var returnValue = binarySearch(sortedArray, 338365)
  } else if (searchType = 'binaryRecursive') {
    var returnValue = binarySearchRecursive(sortedArray, 338365)
  } else if (searchType = 'linear') {
    var returnValue = linearSearch(sortedArray, 338365)
  } else {
    return res.sendStatus(400);
  }  console.timeEnd('selectionSortRoute')
  return res.status(200).send(returnValue)
})
router.get('/insertionSort', (req, res) => {
  console.time('insertionSortRoute')
  const playerId = Number.parseInt(req.query.playerId, 10);
  let searchType = req.query.searchType;

  let sortedArray = insertionSort(jsonData, 'player_id');
  if (searchType = 'binary') {
    var returnValue = binarySearch(sortedArray, 338365)
  } else if (searchType = 'binaryRecursive') {
    var returnValue = binarySearchRecursive(sortedArray, 338365)
  } else if (searchType = 'linear') {
    var returnValue = linearSearch(sortedArray, 338365)
  } else {
    return res.sendStatus(400);
  }
  console.timeEnd('insertionSortRoute')
  return res.status(200).send(returnValue)
})
router.get('/quickSort', (req, res) => {
  console.time('quickSortRoute')
  const playerId = Number.parseInt(req.query.playerId, 10);
  let searchType = req.query.searchType;

  let sortedArray = quickSort(jsonData, 'player_id');
  if (searchType = 'binary') {
    var returnValue = binarySearch(sortedArray, 338365)
  } else if (searchType = 'binaryRecursive') {
    var returnValue = binarySearchRecursive(sortedArray, 338365)
  } else if (searchType = 'linear') {
    var returnValue = linearSearch(sortedArray, 338365)
  } else {
    return res.sendStatus(400);
  }
  console.timeEnd('quickSortRoute')
  return res.status(200).send(returnValue)
})
module.exports = router;
