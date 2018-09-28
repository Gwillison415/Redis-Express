'use strict';

exports.linearSearch = function(array, val, idType) {
  console.time('linearSearch');
  for (var i = 0; i < array.length; i++) {
    if (array[i][idType] === val) {
      console.timeEnd('linearSearch');
      return array[i];
    }
  }
  return -1;
};

exports.binarySearch = function binarySearch(array, idType, value, min = 0, max = array.length - 1) {
  console.time('binarySearch');
  while (min <= max) {
    let mid = Math.floor(min + (max - min) / 2)
    if (array[mid][idType] === value) {
      console.timeEnd('binarySearch');
      return array[mid];
    } else if (value > array[mid][idType]) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }
  console.timeEnd('binarySearch');
  return -1;
};
//
//
exports.binarySearchRecursive = function binarySearchRecursive(array, idType, value, min = 0, max = array.length - 1) {
  console.time('binarySearchRecursive');
  let mid = Math.floor(min + (max - min) / 2)
  if (max - min < 2 && array[0][idType] !== value) {
    console.timeEnd('binarySearchRecursive');
    return -1;
  }  else if (array[mid][idType] === value) {
    console.timeEnd('binarySearchRecursive');
    return array[mid];
  } else if (value > array[mid][idType]) {
    return binarySearchRecursive(array, idType, value, mid, array.length);
  } else {
    return binarySearchRecursive(array, idType, value, min, mid);
  }
}
