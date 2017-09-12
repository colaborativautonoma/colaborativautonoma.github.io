import firebase from 'firebase';

/**
 * @function
 * @name initApp
 * @description firebase initialization
 */
export const initApp = () => {
  const config = {
    apiKey: 'AIzaSyA4fX4f86dBezpexTCGR73lB0qHYK8pe6s',
    authDomain: 'open-canasta.firebaseapp.com',
    databaseURL: 'https://open-canasta.firebaseio.com',
    projectId: 'open-canasta',
    storageBucket: 'open-canasta.appspot.com',
    messagingSenderId: '931256855008',
  };
  firebase.initializeApp(config);
};

/**
 * @function
 * @name setDataOnReference
 * @description set specific register by reference name
 */
export const updateRegister = ({ name, id, newData, callbacks }) => {
  firebase.database().ref(`${name}/${id}`).set(newData)
    .then(() => {
      if (callbacks.then) callbacks.then();
    })
    .catch((error) => {
      if (callbacks.catch) callbacks.catch(error);
    });
};

/**
 * @function
 * @name removeRegister
 * @description remove register by reference and id
 */
export const removeRegister = ({ name, id }) => {
  firebase.database().ref(`${name}/${id}`).remove();
};

/**
 * @function
 * @name addRegister
 * @description add new register
 */
export const addRegister = ({ name, newRegister, callbacks }) => {
  firebase.database().ref(name).push(newRegister)
    .then(() => {
      if (callbacks.then) callbacks.then();
    })
    .catch((error) => {
      if (callbacks.catch) callbacks.catch(error);
    });
};

/**
 * @function
 * @name onAuthStateChanged
 * @description listen event
 */
export const onAuthStateChanged = (callback) => {
  firebase.auth().onAuthStateChanged(user => callback(user));
};

/**
 * @function
 * @name signIn
 */
export const signIn = ({ email, password, callbacks }) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      if (callbacks && callbacks.then) callbacks.then();
    })
    .catch((error) => {
      if (callbacks && callbacks.catch) callbacks.catch(error);
    });
};

/**
 * @function
 * @name logOut
 */
export const logOut = (callbacks) => {
  firebase.auth().signOut()
    .then(() => {
      if (callbacks && callbacks.then) callbacks.then();
    })
    .catch((error) => {
      if (callbacks && callbacks.catch) callbacks.catch(error);
    });
};