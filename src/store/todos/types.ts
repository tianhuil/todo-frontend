export interface Todo {
  id: Id,
  text: string,
  completed: boolean,
}

export type PartialTodo = Pick<Todo, 'id'> & Partial<Omit<Todo, 'id'>>

export type Id = string
