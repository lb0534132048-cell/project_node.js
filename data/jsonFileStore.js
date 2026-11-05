const fs = require('fs').promises;

function createJsonFileStore(filePath) {
  const temporaryPath = `${filePath}.${process.pid}.tmp`;
  let operations = Promise.resolve();

  function runExclusive(operation) {
    const result = operations.then(operation, operation);
    // Keep later operations unblocked while returning this operation's rejection to its caller.
    operations = result.then(() => undefined, () => undefined);
    return result;
  }

  async function read() {
    const content = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(content);
    if (!Array.isArray(data)) {
      throw new Error(`Expected an array in ${filePath}`);
    }
    return data;
  }

  async function write(data) {
    await fs.writeFile(temporaryPath, JSON.stringify(data, null, 2));
    await fs.rename(temporaryPath, filePath);
  }

  return { runExclusive, read, write };
}

module.exports = createJsonFileStore;
