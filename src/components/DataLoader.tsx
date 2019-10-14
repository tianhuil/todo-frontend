import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TodoFirestore } from "../firestore";
import { addTodo } from "../store";
import { Todo } from "../store/todos/types";



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
          case 'removed': {
            console.error('Not Handled')
            break
          }
          case 'modified': {
            console.error('Not Handled')
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
