function fetchData(callback) {
  setTimeout(() => {
    const data = "SDET ROLE";
    callback(null, data);  // null = no error
  }, 1000);
}

fetchData(function(err, data) {
  if (err) {
    console.error("Failed:", err);
    return;
  }
  console.log("Got:", data);  // "Got: user_42"
});

//A callback is a function you pass into another function, telling it: "when you're done, call this." It is the oldest async pattern in JavaScript — everything else on this page was built to fix its problems.
//💡
//Error-first convention. Node.js standardised this: the callback always receives (err, data). If something went wrong, err is an Error object and data is undefined. If it succeeded, err is null and data holds the result. This is why you always check err first.
//Why callbacks become painful — three levels deep Real apps need to do things in sequence: fetch a user, then fetch their orders, then fetch each order's items. With callbacks, every step nests one level deeper. This is callback hell — the shape alone tells you something has gone wrong.

getUser(1, function(err, user) {
  if (err) return console.error(err);

  getOrders(user.id, function(err, orders) {
    if (err) return console.error(err);

    getItems(orders[0].id, function(err, items) {
      if (err) return console.error(err);

      // actual logic buried three layers in
      console.log("Items:", items);
    });
  });
}); // ← notice the pyramid of closing brackets

//Three problems that never go away with callbacks: (1) Error handling must be repeated manually at every single level. (2) The code shape (rightward drift) makes logic hard to follow. (3) You cannot use try/catch — errors cross function boundaries asynchronously and slip right past it. Promises were invented specifically to solve all three of these.
