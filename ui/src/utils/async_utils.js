export async function delay(timeout) {
  return await new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, timeout || 0);
  });
}
