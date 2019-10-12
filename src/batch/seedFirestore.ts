import * as firebase from "firebase/app"
// Required for side-effects -- sad
// See https://firebase.google.com/docs/firestore/quickstart
require("firebase/firestore");

import cuid from 'cuid'

const firebaseConfig = {
  projectId: process.env['PROJECT_ID']
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()

const collection = db.collection('todo')

async function createDoc(datum: Object) {
  const id = cuid()
  await collection.doc(id).set({...datum, id})
}

const data = [
  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', completed: false },
  { text: 'Praesentium placeat aut animi suscipit ipsa nesciunt vitae vero', completed: true },
]

async function main() {
  await Promise.all(data.map(createDoc))
}

if (require.main === module) {
  (async () => {
    try {
      await main()
      console.log("Done")
    } catch (e) {
      console.log("Error")
    }
  })();
}
