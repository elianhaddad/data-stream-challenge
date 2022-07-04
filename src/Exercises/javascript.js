/* eslint-disable import/extensions, no-console */
import filter from 'lodash/filter.js';
import find from 'lodash/find.js';
import flatMap from 'lodash/flatMap.js';
import forEach from 'lodash/forEach.js';
import get from 'lodash/get.js';
import isNumber from 'lodash/isNumber.js';
import isString from 'lodash/isString.js';
import map from 'lodash/map.js';
import omit from 'lodash/omit.js';
import set from 'lodash/set.js';
import sortBy from 'lodash/sortBy.js';
import startsWith from 'lodash/startsWith.js';
import sumBy from 'lodash/sumBy.js';
import uniq from 'lodash/uniq.js';

import moviesData from '../utils/movies.json';

import api from '../Api/index.js';

export const calculateSquare = (data) => map(filter(data, isNumber), (el) => el * el);

export const sumCounters = (objects) => sumBy(objects, (el) => (isNumber(get(el, 'count')) ? el.count : 0));

export const actorInMovies = (movies, actor) => {
  const result = {};
  forEach(movies, (el, key) => {
    set(result, key, {
      actors: uniq([...filter(get(el, 'actors', []), isString), actor]),
      ...omit(el, 'actors'),
    });
  });
  return result;
};

export const appendActorsToBody = (movies) => {
  const body = document.body || document.createElement('BODY');
  const actors = sortBy(uniq(filter(flatMap(movies, (el) => get(el, 'actors')), isString)), (el) => el);
  const list = document.createElement('ul');

  for (let i = 0; i < actors.length; i += 1) {
    const item = document.createElement('li');
    item.appendChild(document.createTextNode(actors[i]));
    list.appendChild(item);
  }

  body.appendChild(list);
};

export const findPost = async () => {
  try {
    const allPosts = await api.getPosts();
    const post = find(allPosts, (el) => get(el, 'userId') === 7 && startsWith(get(el, 'title'), 'e'));
    return post;
  } catch (ex) {
    return get(ex, 'message', ex);
  }
};

export const isIdentical = (firstRoot, secondRoot) => {
  if (!firstRoot && !secondRoot) return true;
  if (firstRoot && !secondRoot) return false;
  if (!firstRoot && secondRoot) return false;

  if (get(firstRoot, 'value') === get(secondRoot, 'value')
        && isIdentical(firstRoot.left, secondRoot.left)
        && isIdentical(firstRoot.right, secondRoot.right)) return true;
  return false;
};

export const countNode = (root) => {
  if (!root) return 0;

  return 1 + countNode(get(root, 'left')) + countNode(get(root, 'right'));
};

//  Help for testing functions

console.log(calculateSquare([2, 'a', false, {}, 4, 6, 8, 10]));
console.log(sumCounters([false, null, undefined, { count: 1 }, { count: 2 }]));
console.log(JSON.stringify(actorInMovies(moviesData, 'Tom Hanks')));
// console.log(appendActorsToBody(moviesData));
findPost().then((res) => console.log(res));
