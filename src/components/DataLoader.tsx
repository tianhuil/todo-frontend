import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { subscribeToFirestore } from "../store";

export const DataLoader = (props: React.PropsWithChildren<{}>) => {
  const dispatch = useDispatch()
  useEffect(
    () => subscribeToFirestore(dispatch)
  )

  return <div>
    {props.children}
  </div>
};
