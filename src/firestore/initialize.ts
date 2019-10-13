import * as firebase from "firebase/app"
// Required for side-effects -- sad
// See https://firebase.google.com/docs/firestore/quickstart
require("firebase/firestore");

export function initializeFirestore() {
  if (!firebase.apps.length) {
    const firebaseConfig = {
      projectId: process.env['REACT_APP_FIREBASE_ID']
    }

    firebase.initializeApp(firebaseConfig);
  }
  return firebase.firestore()
}
