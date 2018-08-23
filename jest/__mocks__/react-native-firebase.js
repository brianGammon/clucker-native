/* eslint-disable no-use-before-define */
export class Reference {
  constructor(path) {
    this.path = path;
    this.snap = { val: () => this.val() };
    this.data = null;
  }

  key = 'key1';

  val = jest.fn(() => this.data);

  child = () => this;

  orderByChild = () => this;

  equalTo = () => this;

  once = jest.fn((param, callback) => {
    const promise = new Promise((resolve) => {
      if (callback) {
        callback(this.snap);
        resolve();
      } else {
        resolve(this.snap);
      }
    });
    RNFirebase.promises.push(promise);
    return promise;
  });

  on = jest.fn((param, callback) => {
    const promise = new Promise((resolve) => {
      if (callback) {
        callback(this.snap);
        resolve();
      } else {
        resolve(this.snap);
      }
    });
    RNFirebase.promises.push(promise);
    return promise;
  });

  off = jest.fn(() => {
    const promise = Promise.resolve();
    RNFirebase.promises.push(promise);
    return promise;
  });

  push = jest.fn((value) => {
    if (!value) {
      const newRef = new Reference();
      return newRef;
    }
    const promise = Promise.resolve();
    RNFirebase.promises.push(promise);
    return promise;
  });

  update = jest.fn(() => {
    const promise = Promise.resolve();
    RNFirebase.promises.push(promise);
    return promise;
  });

  remove = jest.fn(() => {
    const promise = Promise.resolve();
    RNFirebase.promises.push(promise);
    return promise;
  });

  delete = jest.fn(() => {
    const promise = Promise.resolve();
    RNFirebase.promises.push(promise);
    return promise;
  });

  set = jest.fn(() => {
    const promise = Promise.resolve();
    RNFirebase.promises.push(promise);
    return promise;
  });

  putFile = jest.fn(() => {
    const promise = Promise.resolve();
    RNFirebase.promises.push(promise);
    return promise;
  });
}

export class Database {
  ref = (path) => {
    if (!this[path]) {
      this[path] = new Reference(path);
    }
    return this[path];
  };
}

export class Auth {
  onAuthStateChanged = (cb) => {
    cb();
  };

  signOut = () => {};

  signInAndRetrieveDataWithEmailAndPassword = () => {};

  createUserAndRetrieveDataWithEmailAndPassword = () => {};

  sendPasswordResetEmail = () => {};
}

export class Storage {
  ref = (path) => {
    if (!this[path]) {
      this[path] = new Reference(path);
    }
    return this[path];
  };
}

export class MockFirebase {
  constructor() {
    this.database = () => {
      if (!this.databaseInstance) {
        this.databaseInstance = new Database();
      }
      return this.databaseInstance;
    };
    this.auth = () => {
      if (!this.authInstance) {
        this.authInstance = new Auth();
      }
      return this.authInstance;
    };
    this.storage = () => {
      if (!this.storageInstance) {
        this.storageInstance = new Storage();
      }
      return this.storageInstance;
    };
  }
}

export class RNFirebase {
  static initializeApp() {
    RNFirebase.firebase = new MockFirebase();
    RNFirebase.promises = [];
    return RNFirebase.firebase;
  }

  static reset() {
    RNFirebase.promises = [];
    RNFirebase.firebase.databaseInstance = null;
  }

  static waitForPromises() {
    return Promise.all(RNFirebase.promises);
  }
}

export default RNFirebase.initializeApp({
  debug: false,
});
