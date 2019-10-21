import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { userAuthStateChange, userSelector } from '../store'


export const LoginRequired = (props: React.PropsWithChildren<{}>) => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => dispatch(userAuthStateChange(user)))
  })
  const user = useSelector(userSelector)

  if(user) {
    return <>
      {props.children}
    </>
  } else {
    const uiConfig = {
      signInFlow: 'popup', // Popup signin flow rather than redirect flow.
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: () => false  // Avoid redirects after sign-in.
      }
    };

    return <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
    </div>
  }
}
