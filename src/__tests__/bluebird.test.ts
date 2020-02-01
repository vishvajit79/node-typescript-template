describe('Bluebird Replacement Test', () => {
  it('Returns 1 when adding 0 + 1', () => {
    let result = -1;
    let t: NodeJS.Timeout;
    const p = new Promise(resolve => {
      t = setTimeout(resolve, 500);
    })
      .then(() => {
        console.log('I completed');
      })
      .catch(() => {
        console.log('Error');
      })
      .finally(() => {
        if (p.isCancelled()) {
          result = 1;
          console.log('I was cancelled');
          clearTimeout(t);
        }
        expect(result).toBe(1);
      });
    p.cancel();
  });
});
