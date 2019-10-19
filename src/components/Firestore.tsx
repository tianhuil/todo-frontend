import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoHandler, validUserSelector } from "../store";
import { firestore } from "firebase";

const TodoHandlerContext = React.createContext<TodoHandler | null>(null)

export function useTodoHandler(): TodoHandler {
  const todoHandler = useContext(TodoHandlerContext)
  if (!todoHandler) throw new Error('Needs to be invoked inside a todo handler')
  return todoHandler
}

interface IProps {
  db: firestore.Firestore
}

export const Firestore = (props: React.PropsWithChildren<IProps>) => {
  const dispatch = useDispatch()
  const { uid } = useSelector(validUserSelector)
  const todoHandler = new TodoHandler(uid, props.db)

  React.useEffect(() => todoHandler.subscribe(dispatch))

  return <TodoHandlerContext.Provider value={todoHandler}>
    {props.children}
  </TodoHandlerContext.Provider>
};
