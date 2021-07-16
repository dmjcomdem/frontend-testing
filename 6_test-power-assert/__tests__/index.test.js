const assert = require('power-assert');
const { flattenDepth } = require('lodash');

// BEGIN
const array = [1, [2, [3, [4]], 5]];

assert.deepEqual(flattenDepth(array), [1, 2, [3, [4]], 5]);

assert.deepEqual(flattenDepth(array, -1), [1, [2, [3, [4]], 5]]);
assert.deepEqual(flattenDepth(array, 0), [1, [2, [3, [4]], 5]]);
assert.deepEqual(flattenDepth(array, 1), [1, 2, [3, [4]], 5]);
assert.deepEqual(flattenDepth(array, 2), [1, 2, 3, [4], 5]);
assert.deepEqual(flattenDepth(array, 3), [1, 2, 3, 4, 5]);
assert.deepEqual(flattenDepth(array, 10), [1, 2, 3, 4, 5]);

assert.deepEqual(flattenDepth(array, null), [1, [2, [3, [4]], 5]]);
assert.deepEqual(flattenDepth(array, undefined), [1, 2, [3, [4]], 5]);

assert.deepEqual(flattenDepth(array, NaN), [1, [2, [3, [4]], 5]]);
assert.deepEqual(flattenDepth(array, Infinity), [1, 2, 3, 4, 5]);
// END
