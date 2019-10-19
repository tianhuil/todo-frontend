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

  public static itWith(
    name: string,
    fn: (o: IFSTestbed) => Promise<void>
  ): void {
    test(name, FSTestbed.with(fn))
  }

  public static itWithOnly(
    name: string,
    fn: (o: IFSTestbed) => Promise<void>
  ): void {
    test.only(name, FSTestbed.with(fn))
  }
}

const itWithFS = FSTestbed.itWith
const itWithFSOnly = FSTestbed.itWithOnly


beforeAll(async () => {
  expect(process.env['FIRESTORE_EMULATOR_HOST']).toBeTruthy()
})

afterAll(() => {
  Promise.all(firebase.apps().map(app => app.delete()))
})


describe('CRUD Operations', () => {
  function extractTodos(snap: firestore.QuerySnapshot): Todo[] {
    return snap.docs.map(doc => doc.data() as Todo)
  }

  itWithFS('Allowed to perform CRUD on own todo', async ({aliceFS}) => {
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
})


describe('Read Operations', () => {
  itWithFS("Not allowed to query general todos", async ({aliceFS}) => {
    await expect(
      aliceFS.todoCollection
        .doc()
        .get()
    ).rejects.toBeInstanceOf(Error)
  })

  itWithFS("Not allowed to query another's todos", async ({aliceFS}) => {
    await expect(
      aliceFS.todoCollection
        .where('owner', '==', 'bob')
        .get()
    ).rejects.toBeInstanceOf(Error)
  })

  itWithFS("Not allowed to get another's todo by id", async({aliceFS, bobFS}) => {
    const id = cuid()
    await aliceFS.create({id, text: 'Todo', owner: 'alice', completed: false })
    await expect(bobFS.todoCollection.doc(id).get()).rejects.toBeInstanceOf(Error)
  })
})


describe('Create Operations', () => {
  itWithFS("Not allowed to create over another's todos", async ({aliceFS, bobFS}) => {
    const id = cuid()
    await aliceFS.create({id, text: 'Todo', owner: 'alice', completed: false })

    await expect(
      bobFS.create({id, text: 'Todo', owner: 'bob', completed: false })
    ).rejects.toBeInstanceOf(Error)

    await expect(
      bobFS.create({id, text: 'Todo', owner: 'alice', completed: false })
    ).rejects.toBeInstanceOf(Error)
  })

  itWithFS("Not allowed to create todo for another", async ({aliceFS}) => {
    await expect(
      aliceFS.create({id: cuid(), text: 'Todo', owner: 'bob', completed: false })
    ).rejects.toBeInstanceOf(Error)
  })
})


describe('Update Operations', () => {
  itWithFS("Not allowed to update another's todos", async ({aliceFS, bobFS}) => {
    const id = cuid()
    await aliceFS.create({id, text: 'Todo', owner: 'alice', completed: false })

    await expect(
      bobFS.update({id, owner: 'bob', text: 'New Todo' })
    ).rejects.toBeInstanceOf(Error)

    await expect(
      bobFS.update({id, owner: 'alice', text: 'New Todo' })
    ).rejects.toBeInstanceOf(Error)
  })

  itWithFS("Not allowed to update non-existing todo", async ({aliceFS}) => {
    await expect(
      aliceFS.update({id: cuid(), text: 'Todo', owner: 'alice', completed: false })
    ).rejects.toBeInstanceOf(Error)
  })
})


describe('Delete Operations', () => {
  itWithFS("Not allowed to delete another's todos", async ({aliceFS, bobFS}) => {
    const id = cuid()
    await aliceFS.create({id, text: 'Todo', owner: 'alice', completed: false })

    await expect(
      bobFS.delete(id)
    ).rejects.toBeInstanceOf(Error)
  })

  itWithFS("Not allowed to delete non-existing todo", async ({aliceFS}) => {
    await expect(
      aliceFS.delete(cuid())
    ).rejects.toBeInstanceOf(Error)
  })
})
