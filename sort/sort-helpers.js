'use strict';

function swap(arr, idx1, idx2) {
 return  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

function merge(arr1, arr2, idType) {
  const outputArray = [];
  while (arr1.length && arr2.length) {
    if (arr1[0][idType] < arr2[0][idType]) {
      outputArray.push(arr1.shift());
    } else {
      outputArray.push(arr2.shift());
    }
  }
  while (arr2.length) {
    outputArray.push(arr2.shift());
  }
  while (arr1.length) {
    outputArray.push(arr1.shift());
  }
  return outputArray;
}

function partition(arr, idType,left, right) {
  let partitionIDX = left;
  const pivotVal = arr[left][idType];
  for (let i = left; i <= right; i++) {
    if (arr[i][idType] < pivotVal) {
      partitionIDX++;
      swap(arr, i, partitionIDX)
    }
  }
  swap(arr, left, partitionIDX)
  return partitionIDX;
}

module.exports = {
  swap,
  merge,
  partition
};
