import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { TodoHandler } from "../store";

export const TodoHandlerContext = React.createContext<TodoHandler | null>(null)

export function useTodoHandler(): TodoHandler {
  const todoHandler = useContext(TodoHandlerContext)
  if (!todoHandler) throw new Error('Needs to be invoked inside a todo handler')
  return todoHandler
}

export const DataHandler = (props: React.PropsWithChildren<{}>) => {
  const dispatch = useDispatch()
  const todoHandler = new TodoHandler()

  React.useEffect(() => todoHandler.subscribe(dispatch))

  return <TodoHandlerContext.Provider value={todoHandler}>
    {props.children}
  </TodoHandlerContext.Provider>
};
