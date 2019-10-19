import * as firebase from '@firebase/testing'
import cuid from 'cuid'
import { TodoFirestore } from './firestore'
import { Uid, Todo } from './type'
import { firestore, app } from 'firebase'
import { FirebaseError } from '@firebase/util';

interface IFSTestbed {
  aliceFS: TodoFirestore
  bobFS: TodoFirestore
  projectId: string
}

class FSTestbed {
  static async accessToken(app: app.App) {
    return (await (app as any).INTERNAL.getToken()).accessToken
  }

  static async accessToken2(app: TodoFirestore) {
    return this.accessToken(app.db.app)
  }

  private static async newTestTodoFirestore(uid: Uid, projectId: string) {
    const email = `${uid}@example.com`
    const app = firebase.initializeTestApp({
      databaseName: 'default',
      projectId,
      auth: { uid, email },
    })

    // console.log(`${uid} ${await FSTestbed.accessToken(app.firestore().app)}`)
    const result = new TodoFirestore(uid, app.firestore())
    // console.log(`${uid} ${await FSTestbed.accessToken2(result)}`)
    return result
  }

  private static newAdminTodoFirestore(projectId: string) {
    const app = firebase.initializeTestApp({
      databaseName: 'default',
      projectId,
    })
    return new TodoFirestore(null, app.firestore())
  }

  private static with(
    callback: (o: IFSTestbed) => Promise<void>
  ): () => Promise<void> {
    return async () => {
      const projectId = 'test-' + cuid()
      await firebase.clearFirestoreData({projectId})
      const [aliceFS, bobFS] = await Promise.all([
        FSTestbed.newTestTodoFirestore('alice', projectId),
        FSTestbed.newTestTodoFirestore('bob', projectId)
      ])
      await callback({aliceFS, bobFS, projectId})
      await firebase.clearFirestoreData({projectId})
    }
  }

  public static testWith(
    name: string,
    fn: (o: IFSTestbed) => Promise<void>
  ): void {
    test(name, FSTestbed.with(fn))
  }

  public static testWithOnly(
    name: string,
    fn: (o: IFSTestbed) => Promise<void>
  ): void {
    test.only(name, FSTestbed.with(fn))
  }
}

const testWithFS = FSTestbed.testWith
const testWithFSOnly = FSTestbed.testWithOnly

beforeAll(async () => {
  expect(process.env['FIRESTORE_EMULATOR_HOST']).toBeTruthy()
})

function extractTodos(snap: firestore.QuerySnapshot): Todo[] {
  return snap.docs.map(doc => doc.data() as Todo)
}

testWithFS('Allowed to perform crud on own todo', async ({aliceFS}) => {
  const id = cuid()
  await aliceFS.create({id, text: 'Todo', owner: 'alice', completed: false })
  const newTodos = extractTodos(await aliceFS.query())
  expect(newTodos).toHaveLength(1)
  expect(newTodos[0].text).toBe('Todo')

  await aliceFS.update({id, text: 'New Todo'})
  const modifiedTodos = extractTodos(await aliceFS.query())
  expect(modifiedTodos).toHaveLength(1)
  expect(modifiedTodos[0].text).toBe('New Todo')
  expect(modifiedTodos[0].id).toBe(id)

  await aliceFS.delete(id)
  const deletedTodos = extractTodos(await aliceFS.query())
  expect(deletedTodos).toHaveLength(0)
})

testWithFS("Not allowed to query general todos or another's todos", async ({aliceFS}) => {
  await expect(
    aliceFS.todoCollection
      .doc()
      .get()
  ).rejects.toBeInstanceOf(Error)

  await expect(
    aliceFS.todoCollection
      .where('owner', '==', 'bob')
      .get()
  ).rejects.toBeInstanceOf(Error)
})

testWithFS("Not allowed to get another's todo by id", async({aliceFS, bobFS}) => {
  const id = cuid()
  await aliceFS.create({id, text: 'Todo', owner: 'alice', completed: false })
  await expect(bobFS.todoCollection.doc(id).get()).rejects.toBeInstanceOf(Error)
})

testWithFS("Not allowed to create over another's todos", async ({aliceFS, bobFS, projectId}) => {
  console.log(projectId)
  const id = cuid()
  await aliceFS.create({id, text: 'Todo', owner: 'alice', completed: false })

  await expect(
    bobFS.create({id, text: 'Todo', owner: 'bob', completed: false })
  ).rejects.toBeInstanceOf(Error)

  await expect(
    bobFS.create({id, text: 'Todo', owner: 'alice', completed: false })
  ).rejects.toBeInstanceOf(Error)
})

testWithFS("Not allowed to create another's todos", async ({aliceFS}) => {
  await expect(
    aliceFS.create({id: cuid(), text: 'Todo', owner: 'bob', completed: false })
  ).rejects.toBeInstanceOf(Error)
})

afterAll(() => {
  Promise.all(firebase.apps().map(app => app.delete()))
})
