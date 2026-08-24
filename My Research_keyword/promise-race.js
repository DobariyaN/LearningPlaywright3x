function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error(`Timed out after ${ms}ms`)),
      ms
    )
  );
  return Promise.race([promise, timeout]);
}

async function main() {
  try {
    // fetchData takes 800ms — timeout at 500ms
    const data = await withTimeout(fetchData(), 500);
    console.log("Data:", data);
  } catch (err) {
    console.error(err.message);  // "Timed out after 500ms"
  }
}