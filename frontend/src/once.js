

export const once = fn => {
    return (...args) => {
      fn(...args);
      fn = () => {};
    };
  }

export function onceAndAfter(f, g) {
  return (...args) => {
    if (f !== -1) {
      f(...args);
      f = -1;
    } else {
      g(...args);
    }
  };
}


export function billTheUser(some, sales, data) {
    console.log('Klikket');
}

const billOnce = once(billTheUser);

export function ShowItself1(identity) {
  this.identity = identity;
  setTimeout(() => {
    console.log(this.identity)
    }, 1000);
}

function ShowItself2(identity) {
  this.identity = identity;
  let that = this;
  setTimeout(function() {
    console.log(that.identity);
  }, 1000);

  setTimeout(
    function() {
      console.log(this.identity);
    }.bind(this),
    2000
  );

  setTimeout(() => {
    console.log(this.identity);
  }, 3000);
}

//var x = new ShowItself2("JavaScript");
// after one second, "JavaScript"
// after another second, the same
// after yet another second, once again