import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAxP5okpHgw-B5tC4ibi6-t8mAi1zObrlg",
    authDomain: "e-commerce-948ee.firebaseapp.com",
    databaseURL: "https://e-commerce-948ee.firebaseio.com",
    projectId: "e-commerce-948ee",
    storageBucket: "e-commerce-948ee.appspot.com",
    messagingSenderId: "729798519281",
    appId: "1:729798519281:web:886839b2d4bba9da687c50"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }
    }
    return userRef;
  } 

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
