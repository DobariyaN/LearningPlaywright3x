
  
  const delay = (ms, val) =>
  new Promise(res => setTimeout(() => res(val), ms));

// ✗ Sequential — takes 1500ms total (500 + 500 + 500)
async function sequential() {
  const a = await delay(500, "users");
  const b = await delay(500, "posts");
  const c = await delay(500, "comments");
  return [a, b, c];
}

// ✓ Parallel — takes ~500ms total (all run at once)
async function parallel() {
  const [a, b, c] = await Promise.all([
    delay(500, "users"),
    delay(500, "posts"),
    delay(500, "comments"),
  ]);
  return [a, b, c];
}

// Promise.allSettled — get every result, never throws
async function safeParallel() {
  const results = await Promise.allSettled([
    delay(300, "ok"),
    Promise.reject(new Error("failed")),
    delay(100, "also ok"),
  ]);

  results.forEach(r => {
    if (r.status === "fulfilled") console.log("✓", r.value);
    if (r.status === "rejected")  console.log("✗", r.reason.message);
  });
}

//
//Promise.all takes an array of Promises and runs them all at the same time. It waits until every single one has fulfilled, then resolves with an array of all their results — in the same order as the input, regardless of which finished first.

//One failure rejects everything. If any single Promise in the array rejects, Promise.all immediately rejects with that error — and you lose all the other results, even the ones that already succeeded. This is called fail-fast behaviour. If you need every result regardless of individual failures, use Promise.allSettled instead.

// Promise.all — all succeed
// Promise.all([p1✓, p2✓, p3✓])
//   → resolves: [r1, r2, r3]
//
// Promise.all — one fails
// Promise.all([p1✓, p2✗, p3✓])
//   → rejects immediately with p2's error
//   → r1 and r3 are lost
