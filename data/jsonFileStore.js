const fs = require('fs').promises;
const { randomUUID } = require('crypto');

const LOCK_TIMEOUT_MS = 5000;
const STALE_LOCK_MS = 120000;

function createStoreError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function createJsonFileStore(filePath, validateData) {
  const lockPath = `${filePath}.lock`;
  let operations = Promise.resolve();

  function runExclusive(operation) {
    const result = operations.then(
      () => withFileLock(operation),
      () => withFileLock(operation)
    );
    operations = result.then(() => undefined, () => undefined);
    return result;
  }

  async function isLockStale() {
    let stats;
    try {
      stats = await fs.stat(lockPath);
    } catch (error) {
      if (error.code === 'ENOENT') return true;
      throw error;
    }

    if (Date.now() - stats.mtimeMs <= STALE_LOCK_MS) return false;

    let owner;
    try {
      owner = JSON.parse(await fs.readFile(lockPath, 'utf8'));
    } catch (error) {
      if (error.code !== 'ENOENT' && !(error instanceof SyntaxError)) throw error;
    }

    if (owner && Number.isSafeInteger(owner.pid) && owner.pid > 0) {
      try {
        process.kill(owner.pid, 0);
        return false;
      } catch (error) {
        if (error.code === 'EPERM') return false;
        if (error.code !== 'ESRCH') throw error;
      }
    }

    const currentStats = await fs.stat(lockPath).catch(error => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (!currentStats) return true;
    if (currentStats.ino !== stats.ino || currentStats.mtimeMs !== stats.mtimeMs) return false;

    try {
      await fs.unlink(lockPath);
      return true;
    } catch (error) {
      if (error.code === 'ENOENT') return true;
      throw error;
    }
  }

  async function acquireFileLock() {
    const deadline = Date.now() + LOCK_TIMEOUT_MS;

    while (Date.now() < deadline) {
      let handle;
      let created = false;
      try {
        handle = await fs.open(lockPath, 'wx');
        created = true;
        await handle.writeFile(JSON.stringify({ pid: process.pid }));

        return async function release() {
          let closeError;
          try {
            await handle.close();
          } catch (error) {
            closeError = error;
          }
          try {
            await fs.unlink(lockPath);
          } catch (error) {
            if (error.code !== 'ENOENT') throw error;
          }
          if (closeError) throw closeError;
        };
      } catch (error) {
        if (handle) {
          try {
            await handle.close();
          } catch (closeError) {
            console.error(closeError);
          }
        }
        if (created) {
          try {
            await fs.unlink(lockPath);
          } catch (cleanupError) {
            if (cleanupError.code !== 'ENOENT') console.error(cleanupError);
          }
        }
        if (error.code !== 'EEXIST') throw error;
        await isLockStale();
        await new Promise(resolve => setTimeout(resolve, 25 + Math.floor(Math.random() * 25)));
      }
    }

    throw createStoreError('FILE_LOCK_TIMEOUT', 'Timed out waiting for the data file lock.');
  }

  async function withFileLock(operation) {
    const release = await acquireFileLock();
    let operationError;
    try {
      return await operation();
    } catch (error) {
      operationError = error;
      throw error;
    } finally {
      try {
        await release();
      } catch (error) {
        if (!operationError) throw error;
        console.error(error);
      }
    }
  }

  async function read() {
    const content = await fs.readFile(filePath, 'utf8');

    let data;
    try {
      data = JSON.parse(content);
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw createStoreError('INVALID_JSON_FILE', 'The data file contains invalid JSON.');
      }
      throw error;
    }

    try {
      validateData(data);
    } catch (error) {
      if (error.code === 'INVALID_DATA_FILE') throw error;
      throw createStoreError('INVALID_DATA_FILE', 'The data file has an invalid structure.');
    }
    return data;
  }

  async function write(data) {
    validateData(data);
    const temporaryPath = `${filePath}.${process.pid}.${randomUUID()}.tmp`;
    try {
      await fs.writeFile(temporaryPath, JSON.stringify(data, null, 2), { flag: 'wx' });
      await fs.rename(temporaryPath, filePath);
    } catch (error) {
      try {
        await fs.unlink(temporaryPath);
      } catch (cleanupError) {
        if (cleanupError.code !== 'ENOENT') console.error(cleanupError);
      }
      throw error;
    }
  }

  return { runExclusive, read, write };
}

module.exports = createJsonFileStore;
