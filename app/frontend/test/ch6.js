//6.1
const getField = attr => obj => obj == null ? null : obj[attr];



//6.2
function fib(n) {
    if (n == 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else {
        return fib(n - 2) + fib(n - 1);
    }
}

function fibCalls(n) {
    if (n == 0 || n == 1) {
        return 1;
    } else {
        return fibCalls(n - 2) + fibCalls(n - 1) + 1;
    }
}

const memoize = fn => {
    let cache = {};
    return x => (x in cache ? cache[x] : (cache[x] = fn(x)));
};

//6.3
const randomizer = function(...fns) {
    let fn = null;
    return function() {
        while (true) {
            let newFn = fns[Math.floor(Math.random() * fns.length)];
            if (newFn !== fn) {
                fn = newFn;
                return fn;
            }
        }
    };
};

export { getField, fibCalls, randomizer };

const range = (start, stop) => [...Array(stop-start).keys()].map((value) => value + start);

const curryByEval = (fn, len = fn.length) =>
  `${range(0, len).map(i => `x${i}`).join("=>")} =>  ${fn.name}(${range(0, len).map(i => `x${i}`).join(",")})`;

console.log(curryByEval(range));

