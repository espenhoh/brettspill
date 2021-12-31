import winston from "winston";

function subtract(a, b) {
  b = changeSign(b);
  return a + b;
}

function changeSign(c) {
  return -c;
}


const addLogging3 = (fn, logger = console.log) => (...args) => {
    logger(`entering ${fn.name}: ${args}`);
    try {
      const valueToReturn = fn(...args);
      logger(`exiting ${fn.name}: ${valueToReturn}`);
      return valueToReturn;
    } catch (thrownError) {
      logger(`exiting ${fn.name}: threw ${thrownError}`);
      throw thrownError;
    }
  };


const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' })
  ]
});
  //const myLogger = logger.debug;
const myLogger = t => logger.debug(`Logging by winston: ${t}`);

subtract = addLogging3(subtract, myLogger);
changeSign = addLogging3(changeSign, myLogger);
//let x = subtract(7, 5);

const myPut = (text, name, tStart, tEnd) =>
  console.log(`${name} - ${text} ${tEnd - tStart} ms`);

const myGet = () => performance.now();

const addTiming = (fn, getTime = myGet, output = myPut) => (...args) => {
  let tStart = getTime();

  try {
    const valueToReturn = fn(...args);
    output("normal exit", fn.name, tStart, getTime());
    return valueToReturn;

  } catch (thrownError) {
    output("exception thrown", fn.name, tStart, getTime());
    throw thrownError;
  }
};

let fib = n => n >= 0 && n <= 1 ? n : fib(n - 2) + fib(n - 1);

const memoize = fn => {
  let cache = {};
  return x => (x in cache ? cache[x] : (cache[x] = fn(x)));
};




fib = memoize(fib);

addTiming(fib)(45); // 15,537.575 ms
addTiming(fib)(45); //      0.005 ms... good!
addTiming(fib)(40); //  1,368.880 ms... recalculating?
addTiming(fib)(35); //    123.970 ms... here too?