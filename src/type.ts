export interface Synced<T> {
  // synced is true if the object is in sync with DB
  synced: boolean
  data: T
}

export type Id = string
export type Uid = string

export interface Todo {
  id: Id,
  text: string,
  completed: boolean,
  owner: Uid,
}

export type PartialTodo = Pick<Todo, 'id'> & Partial<Omit<Todo, 'id'>>
