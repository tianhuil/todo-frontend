export interface Synced<T> {
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
