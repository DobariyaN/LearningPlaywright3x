//await pauses an async function until the Promise it is waiting for settles, then hands you the resolved value. Critically, it only pauses that one function — the rest of your program keeps running.
async function loadUserData(id) {
  const user   = await fetchUser(id);
  const orders = await fetchOrders(user.id);
  const items  = await fetchItems(orders[0].id);

  return items;  // wrapped in a Promise automatically
}

loadUserData(1).then(items => console.log(items));

//This is the same three-step chain from both earlier examples — now it reads like synchronous code top-to-bottom, with none of the callback nesting.

//Error handling with try / catch
//This is the big win: you can use the familiar try/catch syntax that works everywhere else in JavaScript.

async function loadUserData(id) {
  try {
    const user = await fetchUser(id);
    const orders = await fetchOrders(user.id);
    return orders;
  } catch (err) {
    // catches rejection from ANY of the awaits above
    console.error("Something failed:", err.message);
    return [];  // return a safe default
  }
}

//Seeing it in the console — order matters


async function demo() {
  console.log("A — before await");

  const result = await new Promise(res =>
    setTimeout(() => res("done"), 100)
  );

  console.log("C — after await, result:", result);
}

demo();
console.log("B — this runs while demo() is awaiting");

//Read the output, not the code order. B prints before C even though B is written after demo() is called. That gap between A and C is exactly where the event loop goes off and does other work. This is the single-threaded-but-not-frozen model in action.

//  Common mistake — sequential when you wanted parallel. If you write two awaits in a row and neither depends on the other, they run one after the other, wasting time. Use Promise.all (next section) to run them simultaneously.

