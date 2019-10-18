import * as firebase from '@firebase/testing'
import cuid from 'cuid'
import { TodoFirestore } from './firestore'
import { Uid } from './type'

const projectId = 'test'

let aliceApp: TodoFirestore
let bobApp: TodoFirestore
let adminApp: TodoFirestore

function newTestTodoFirestore(uid: Uid) {
  const email = `${uid}@example.com`
  const app = firebase.initializeTestApp({
    projectId,
    auth: { uid, email },
  })
  return new TodoFirestore(uid, app.firestore())
}

function newAdminTodoFirestore() {
  const app = firebase.initializeTestApp({
    projectId,
  })
  return new TodoFirestore(null, app.firestore())
}

beforeAll(() => {
  aliceApp = newTestTodoFirestore('alice')
  bobApp = newTestTodoFirestore('alice')
  adminApp = newAdminTodoFirestore()
})

beforeEach(async () => {
  await firebase.clearFirestoreData({projectId})
})

describe('foo', () => {
  it('write', async () => {
    await aliceApp.create({id: cuid(), text: 'hi', owner: 'alice', completed: false })
    const read = await aliceApp.db.collection('todo').where('owner', '==', 'alice').get()
    expect(read.docs).toHaveLength(1)
    Promise.all(firebase.apps().map(app => app.delete()))

    const badRead = aliceApp.db.collection('todo').doc().get()
    firebase.assertFails(badRead)
  })
})

test('sum', () => {
  expect(1+1).toBe(2)
})


afterAll(() => {
  firebase.apps().map(app => app.delete())
})
