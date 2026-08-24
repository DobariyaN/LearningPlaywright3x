// The async keyword turns a regular function into one that always returns a Promise — even if you return a plain value from it. It is the entry point: you cannot use await unless you are inside an async function.

//Without async
function greet() {
  return "hello";
}
console.log(greet()); // "hello" (string)

//With async
async function greetAsync() {
  return "hello";
}
console.log(greetAsync()); // Promise { "hello" }

// The single-threaded event loop — shown in output
// This is the most important mental model. JavaScript runs one thing at a time, but when it hits an async operation it does not sit and wait — it moves on and comes back later. Watch the output order below:
console.log("[1] Script starts");

setTimeout(() => {
  console.log("[3] Inside setTimeout (runs last)");
}, 0);  // 0ms — still async!

console.log("[2] Script ends (runs before setTimeout)");

//The key insight: even setTimeout(..., 0) goes to the back of the queue. JavaScript finishes all synchronous code first, then processes queued async callbacks. This ordering is the entire point of the event loop.

// All four forms are valid

//Declaring an async function

async function named() {
  return "named";
}

const arrow = async () => "arrow";

const obj = {
  async method() {
    return "method";
  }
};

// Immediately invoked (common at module top-level)
(async () => {
  // await is allowed here
  console.log(await named(), await arrow(), await obj.method());
})();
