'use strict';

const swap = require('./sort-helpers').swap;
const merge = require('./sort-helpers').merge;
const partition = require('./sort-helpers').partition;

function mergeSort(array, idType) {
  console.time('mergeSort')
  if (array.length <= 1) {
    console.timeEnd('mergeSort')
    return array;
  }
  let mid = Math.floor(array.length / 2);
  let leftSmaller = array.slice(0, mid);
  let rightLarger = array.slice(mid);
  return merge(mergeSort(leftSmaller, idType), mergeSort(rightLarger, idType), idType);
}

function quickSort(array, idType, left = 0, right = array.length - 1) {
  console.time('quickSort')
  if (left < right) {
    let partitionIDX = partition(array, idType, left, right);
    quickSort(array, idType,  left, partitionIDX -1);
    quickSort(array, idType,  partitionIDX + 1, right )
  }
  console.timeEnd('quickSort')
  return array;
}

function bubbleSort(arr, idType) {
  console.time('bubbleSort')
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j][idType] > arr[j + 1][idType]) {
        swap(arr, j, j + 1);
      }
    }
  }

  console.timeEnd('bubbleSort')
  return arr;


}
//sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array.
//One advantage of selection sort over insertion sort, is that the number of writes (swaps) is in O(n), while in insertion sort it is in O(n^2)
function selectionSort(array, idType) {
  console.time('selectionSort')
  for (var i = 0; i < array.length; i++) {
    let min = i;
    for (var j = i + 1 ; j < array.length; j++) {
      if (array[min][idType] > array[j][idType]) {
        min = j;
      }
    }
    if (i !== min) {
      swap(array, i, min);
    }
  }
  console.timeEnd('selectionSort')
  return array;
}
//simple sorting algorithm that works the way we sort playing cards in our hands.
// it takes minimum time (Order of n) when elements are already sorted
function insertionSort(arr, idType) {
console.time('insertionSort')
  let unsorted, sorted;
  for (let i = 1; i < arr.length; i++) {
    unsorted = i;
    for (let j = i - 1; j >= 0; j--) {
      sorted = j;
      if (arr[unsorted][idType] < arr[sorted][idType] && unsorted > 0) {
        swap(arr, unsorted, sorted);
        unsorted -= 1;
      }
    }
  }
  console.timeEnd('insertionSort')
  return arr;
}

module.exports = {
  mergeSort,
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort
};
