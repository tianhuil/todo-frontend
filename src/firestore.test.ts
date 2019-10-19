import * as firebase from '@firebase/testing'
import cuid from 'cuid'
import { TodoFirestore } from './firestore'
import { Uid, Todo } from './type'
import { firestore } from 'firebase'

const projectId = 'test'

let aliceApp: TodoFirestoreExtended
let bobApp: TodoFirestoreExtended
let adminApp: TodoFirestoreExtended

class TodoFirestoreExtended extends TodoFirestore {
  async new(text: string) {
    if (!this.uid) throw new Error('admin cannot use this method, use create instead')
    return this.create({id: cuid(), text, owner: this.uid, completed: false })
  }
}

function newTestTodoFirestore(uid: Uid) {
  const email = `${uid}@example.com`
  const app = firebase.initializeTestApp({
    projectId,
    auth: { uid, email },
  })
  return new TodoFirestoreExtended(uid, app.firestore())
}

function newAdminTodoFirestore() {
  const app = firebase.initializeTestApp({
    projectId,
  })
  return new TodoFirestoreExtended(null, app.firestore())
}

beforeAll(() => {
  expect(process.env['FIRESTORE_EMULATOR_HOST']).toBeTruthy()

  aliceApp = newTestTodoFirestore('alice')
  bobApp = newTestTodoFirestore('bob')
  adminApp = newAdminTodoFirestore()
})

beforeEach(async () => {
  await firebase.clearFirestoreData({projectId})
})

function extractTodos(snap: firestore.QuerySnapshot): Todo[] {
  return snap.docs.map(doc => doc.data() as Todo)
}

test('Allowed to perform crud on own todo', async () => {
  await aliceApp.new('Todo')
  const newTodos = extractTodos(await aliceApp.query())
  expect(newTodos).toHaveLength(1)
  expect(newTodos[0].text).toBe('Todo')

  await aliceApp.update({id: newTodos[0].id, text: 'New Todo'})
  const modifiedTodos = extractTodos(await aliceApp.query())
  expect(modifiedTodos).toHaveLength(1)
  expect(modifiedTodos[0].text).toBe('New Todo')
  expect(modifiedTodos[0].id).toBe(newTodos[0].id)

  await aliceApp.delete(newTodos[0].id)
  const deletedTodos = extractTodos(await aliceApp.query())
  expect(deletedTodos).toHaveLength(0)
})

test("Not allowed to query general todos or another's todos", async () => {
  firebase.assertFails(
    aliceApp.todoCollection
      .doc()
      .get()
  )

  firebase.assertFails(
    aliceApp.todoCollection
      .where('owner', '==', 'bob')
      .get()
  )
})

test("Not allowed to get another's todo by id", async() => {
  const id = cuid()
  await aliceApp.create({id, text: 'Todo', owner: 'alice', completed: false })
  firebase.assertFails(bobApp.todoCollection.doc(id).get())
})

test("Not allowed to create over another's todos", async () => {
  const id = cuid()
  await aliceApp.create({id, text: 'Todo', owner: 'alice', completed: false })

  firebase.assertFails(
    bobApp.create({id, text: 'Todo', owner: 'bob', completed: false })
  )

  firebase.assertFails(
    bobApp.create({id, text: 'Todo', owner: 'alice', completed: false })
  )
})

test("Not allowed to create another's todos", async () => {
  firebase.assertFails(
    aliceApp.create({id: cuid(), text: 'Todo', owner: 'bob', completed: false })
  )
})

afterAll(() => {
  Promise.all(firebase.apps().map(app => app.delete()))
})
