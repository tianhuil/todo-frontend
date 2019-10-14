import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TodoFirestore } from "../firestore";
import { addTodo, modifyTodo, removeTodo } from "../store";
import { Todo, PartialTodo } from "../store/todos/types";



export const DataLoader = (props: React.PropsWithChildren<{}>) => {
  const dispatch = useDispatch()
  const todoFirestore = new TodoFirestore()
  todoFirestore.initialize()

  useEffect(
    () => todoFirestore.subscribeChanges(
      change => {
        switch(change.type) {
          case 'added': {
            dispatch(addTodo(change.doc.data() as Todo))
            break
          }
          case 'modified': {
            dispatch(modifyTodo(change.doc.data() as PartialTodo))
            break
          }
          case 'removed': {
            dispatch(removeTodo((change.doc.data() as Todo).id))
            break
          }
        }
      }
    )
  )

  return <div>
    {props.children}
  </div>
};
