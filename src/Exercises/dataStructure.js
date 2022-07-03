/* eslint-disable import/extensions, no-console */
import filter from 'lodash/filter.js';
import join from 'lodash/join.js';
import size from 'lodash/size.js';
import split from 'lodash/split.js';
import take from 'lodash/take.js';
import {
  actorInMovies, countNode, calculateSquare, isIdentical, sumCounters,
} from './javascript.js';

import moviesData from '../utils/movies.json';

export const squares = (nums) => calculateSquare(nums);
export const sum = (counters) => sumCounters(counters);
export const moviesWithActor = (movies, actor) => actorInMovies(movies, actor);

export const treesAreEqual = (firstRoot, secondRoot) => {
  const firstRootCount = countNode(firstRoot);
  if (firstRootCount > 100) return 'First tree cannot have more than 100 nodes';

  const secondRootCount = countNode(secondRoot);
  if (secondRootCount > 100) return 'Second tree cannot have more than 100 nodes';

  return isIdentical(firstRoot, secondRoot);
};

export const formatted = (str, n) => {
  const result = [];
  const strArray = filter(split(str, ''), (el) => el !== '-');
  const remainder = size(strArray) % n;

  if (remainder !== 0) {
    const firstGroup = join(take(strArray, remainder), '');
    result.push(firstGroup);
  }

  let nCount = 0;
  let group = [];

  for (let i = remainder !== 0 ? remainder : 0; i < size(strArray); i += 1) {
    if (nCount === n) {
      nCount = 0;
      result.push(join(group, ''));
      group = [];
    }

    group.push(strArray[i]);
    nCount += 1;
  }

  result.push(join(group, ''));

  return join(result, '-');
};

//  Help for testing functions

console.log(squares([2, 4]));
console.log(sum([false, null, undefined, { count: 1 }, { count: 2 }]));
console.log(JSON.stringify(actorInMovies(moviesData, 'Tom Hanks')));

const a = {
  value: 1,
  left: { value: 2 },
  right: { value: 3 },
};

const b = {
  value: 1,
  left: { value: 2 },
  right: {
    value: 3,
    left: { value: 4 },
  },
};

console.log(treesAreEqual(a, b));
console.log(formatted('3h5n', 4));
console.log(formatted('3h5n-8v-7-m', 4));
console.log(formatted('4-3t-0-u', 2));
console.log(formatted('j-45i9ut5-34f-x10', 5));
