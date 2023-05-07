import React from 'react'
import { auth, db, googleProvider } from '../config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useStore } from '../global/store'
import { useNavigate } from 'react-router-dom'



export const googleSignIn = () => {
  const navigate = useNavigate()
  const { actionLoading, setActionLoading, setLoggedIn } = useStore()

  signInWithPopup(auth, googleProvider)
    .then((user) => {
      handleCreateDoc(user.user.uid)
      console.log(user)
      setLoggedIn(true)
      setActionLoading(false)
      navigate('/')
    })
    .catch((e) => {
      console.log(e)
      alert(e)
    })
}

export const facebookSignIn = () => {
  signInWithPopup(auth, facebookProvider)
    .then((user) => {
      handleCreateDoc(user.user.uid)
      console.log(user)
      setLoggedIn(true)
      setActionLoading(false)
      navigate('/')
    })
    .catch((e) => {
      console.log(e)
      alert(e)
    })
}

export const handleCreateDoc = async (id) => {
  await setDoc(doc(db, 'users', id), {
    phoneNumber: '',
    gender: '',
    isProfileCompleted: false,
  })
    .then((res) => console.log(res))
    .catch((e) => console.log(e))
}
