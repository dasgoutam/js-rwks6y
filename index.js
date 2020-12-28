// Import stylesheets
import "./style.css";

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>JS Starter</h1>`;

class Observable {
  constructor(callback) {
    this.start = false;
    this.success = [];
    this.error = [];
    this.close = [];
    this.hasStarted = true;

    this.callback = callback;
  }

  next(val) {
    for (let f of this.success) {
      f(val);
    }
  }

  complete(val) {
    for (let f of this.close) {
      f(val);
    }
  }

  subscribe(success, error, close) {
    if (this.hasStarted) {
      this.callback(this);
      this.hasStarted = false;
    }
    this.success.push(success);
    this.error.push(error);
    this.close.push(close);
  }
}

function success(num) {
  console.log(`success with - ${num * 5}`);
}

function close(num) {
  console.log(`closing with - ${num}`);
}

function error() {
  console.log("error");
}

function input(subscriber) {
  let count = 0;
  let int = setInterval(() => {
    if (count >= 10) {
      clearInterval(int);
      subscriber.complete(count);
      // for (let f of this.close) {
      //   f(count);
      // }
      return;
    }
    count = count + 1;
    subscriber.next(count);
    // for (let f of this.success) {
    //   f(count);
    // }
  }, 1000);
}

let first = new Observable(input);

first.subscribe(success, error, close);
first.subscribe(close, error, success);
