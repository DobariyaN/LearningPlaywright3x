function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "SDET ROLE" });   // success
      } else {
        reject(new Error("Invalid id"));  // failure
      }
    }, 500);
  });
}

// Consuming with .then() / .catch()

//Notice how .catch() at the end catches any rejection in the whole chain — you do not need an if (err) check at every step. This is the fundamental improvement over callbacks.

fetchUser(1)
  .then(user  => console.log("User:", user))
  .catch(err => console.error("Error:", err.message));

  fetchUser(1)
  .then(user   => fetchOrders(user.id))
  .then(orders => fetchItems(orders[0].id))
  .then(items  => console.log("Items:", items))
  .catch(err  => console.error("Something failed:", err));

  //A Promise is an object that represents a value that does not exist yet. It is always in one of three states: pending (waiting), fulfilled (success), or rejected (failure). Once it settles into either fulfilled or rejected, it never changes state again.

//pending ──→ fulfilled ✓ or rejected ✗