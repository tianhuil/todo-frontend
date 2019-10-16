export interface Synced<T> {
  synced: boolean
  data: T
}

export type Id = string

export interface Todo {
  id: Id,
  text: string,
  completed: boolean,
}

export type PartialTodo = Pick<Todo, 'id'> & Partial<Omit<Todo, 'id'>>
