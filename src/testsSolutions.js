import {formatted, moviesWithActor, squares, sum, treesAreEqual} from './Exercises/dataStructure.js';

const testSolutions = () => {
    const assert = cond => {
        if (cond) console.log('assertion success')
        if (!cond) throw new Error('assertion failure')
    }
    const arrEq = (a, b) => a.every((x, i) => x === b[i])
    const occurences = (xs, x) => xs.reduce((acc, y) => acc + (x === y ? 1 : 0), 0)
    const moviesAreValid = (movies, actor) => {
        for (const key in movies) {
            if (occurences(movies[key].actors, actor) !== 1) return false
        }
        return true
    }
    const deepFreeze = x => {
        if (Array.isArray(x)) {
            Object.freeze(x)
            x.forEach(deepFreeze)
        }
        else if (typeof x === 'object') {
            Object.freeze(x)
            for (const key in x) deepFreeze(x[key])
        }
    }
    const movies1 = {
        'big': {
            actors: ['Elizabeth Perkins', 'Robert Loggia'],
        },
        'forrest gump': {
            actors: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
        },
        'cast away': {
            actors: ['Helen Hunt', 'Paul Sanchez'],
        },
    }
    const movies2 = {
        'good will hunting': {
            actors: ['Robin Williams', 'Ben Affleck'],
        },
        'the departed': {
            actors: ['Leonardo DiCaprio', 'Matt Damon', 'Jack Nicholson'],
        },
    }
    deepFreeze(movies1)
    deepFreeze(movies2)
    const trees1 = [
        { value: 1, left: { value: 2 }, right: { value: 3 } },
        { value: 1, left: { value: 2 }, right: { value: 3 } },
        10
    ]
    const trees2 = [
        { value: 1, left: { value: 2 } },
        { value: 1, right: { value: 2 } },
    ]
    const trees3 = [
        { value: 1, left: { value: 2 }, right: { value: 3 } },
        { value: 1, left: { value: 2 }, right: { value: 3, left: { value: 4 } } },
    ]
    const trees4 = [
        { value: 1, left: { value: 2 } },
        { value: 1, right: { value: 2 } },
    ]
    const trees5 = [
        { value: 1, left: { value: 2 }, right: { value: 3, right: { value: 4, left: { value: 5 } } } },
        { value: 1, left: { value: 2 }, right: { value: 3, right: { value: 4, left: { value: 5 } } } },
    ]
    assert(arrEq(squares([2, 4, 6, 8, 10]), [4, 16, 36, 64, 100]))
    assert(arrEq(squares([17, 9, 186]), [289, 81, 34596]))
    assert(sum([{ count: 1 }, { count: 2 }, { count: 3 }]) === 6)
    assert(sum([{ count: 95 }, { count: 8 }, { count: 23 }, { count: 51 }]) === 177)
    assert(moviesAreValid(moviesWithActor(movies1, 'Tom Hanks'), 'Tom Hanks'))
    assert(moviesAreValid(moviesWithActor(movies2, 'Matt Damon'), 'Matt Damon'))
    assert(treesAreEqual(trees1[0], trees1[1]) === true)
    assert(treesAreEqual(trees2[0], trees2[1]) === false)
    assert(treesAreEqual(trees3[0], trees3[1]) === false)
    assert(treesAreEqual(trees4[0], trees4[1]) === false)
    assert(treesAreEqual(trees5[0], trees5[1]) === true)
    assert(formatted("3h5n-8v-7-m", 4) === "3h5n-8v7m")
    assert(formatted("4-3t-0-u", 2) === "4-3t-0u")
    assert(formatted("j-45i9ut5-34f-x10", 5) === "j45i-9ut53-4fx10")
    console.log('passed')
}

testSolutions();