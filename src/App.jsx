import { useEffect, useState } from 'react'
import './App.css'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { MainTemplate } from './components/templates/MainTemplate'
import { HomePage } from './pages/HomePage'
import { Gallery } from './pages/Gallery'
import { auth } from './config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useStore } from './global/store'
import BeatLoader from 'react-spinners/BeatLoader'
import { EditProfile } from './pages/EditProfile'
import { PhotoCategory } from './pages/PhotoCategory'
import { DetailCategory } from './pages/DetailCategory'
import { ProfileTemplate } from './components/templates/ProfileTemplate'

function App() {
  const pending = useStore((state) => state.authRefreshing)
  const setPending = useStore((state) => state.setAuthRefreshing)
  const { isLoggedIn } = useStore()

  useEffect(() => {
    console.log(auth)
    console.log('Login State', isLoggedIn)
    // setPending(true)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        setPending(false)
      } else {
        console.log(user)
        setPending(false)
      }
    })
  }, [])

  const LoginCheck = () =>
    auth.currentUser !== null ? <Navigate to={'/'} /> : <Outlet />
  const UserCheck = () =>
    auth.currentUser === null ? <Navigate to={'/'} /> : <Outlet />

  console.log(auth.currentUser !== null ? 'true' : 'false')

  return pending ? (
    <div className="flex h-screen items-center justify-center w-full">
      <BeatLoader color='#88ceef' />
    </div>
  ) : (
    <Routes>
      {/* main */}
      <Route
        path='/'
        element={<MainTemplate />}>
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path='/gallery'
          element={<Gallery />}
        />
        <Route
          path='/photo-category'
          element={<PhotoCategory />}
        />
        <Route
          path='/photo-category/:id'
          element={<DetailCategory />}
        />
      </Route>

      <Route element={<LoginCheck />}>
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/signin'
          element={<SignIn />}
        />
      </Route>

      {/* <Route element={<UserCheck />}>
        <Route
          path='/edit-profile'
          element={<EditProfile />}
        />
      </Route> */}

      <Route element={<UserCheck />}>
        <Route
          path='/profile'
          element={<ProfileTemplate />}>
          <Route
            index
            element={<EditProfile />}
          />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
