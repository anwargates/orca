import { Loader, LoadingOverlay } from '@mantine/core'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { AdminTemplate } from './components/templates/AdminTemplate'
import { MainTemplate } from './components/templates/MainTemplate'
import { ProfileTemplate } from './components/templates/ProfileTemplate'
import { auth, db } from './config/firebase'
import { useStore } from './global/store'
import { DetailCategory } from './pages/DetailCategory'
import { EditProfile } from './pages/EditProfile'
import { Gallery } from './pages/Gallery'
import { HomePage } from './pages/Homepage'
import { Payment } from './pages/Payment'
import { PhotoCategory } from './pages/PhotoCategory'
import { SignIn } from './pages/Signin'
import { SignUp } from './pages/Signup'
import { DashPayments } from './pages/admin/DashPayments'
import { Dashboard } from './pages/admin/Dashboard'
import { UserNotification } from './pages/UserNotification'
import { Orders } from './pages/Orders'
import { AdminSignIn } from './pages/admin/AdminSignIn'
import About from './pages/About'
import { PaymentPelunasan } from './pages/PaymentPelunasan'

function App() {
  const pending = useStore((state) => state.authRefreshing)
  const setPending = useStore((state) => state.setAuthRefreshing)
  const { isLoggedIn, isAdmin, setAdmin, actionLoading } = useStore()

  useEffect(() => {
    console.log(auth)
    console.log('Login State', isLoggedIn)
    // setPending(true)
    onAuthStateChanged(auth, (user) => {
      const checkAdmin = async () => {
        if (user) {
          console.log(user.uid)
          const docRef = doc(db, 'users', user.uid)
          console.log(docRef)
          await getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
              console.log(docSnap.data())
              setAdmin(docSnap.data().isAdmin)
              console.log(isAdmin)
            }
          })
          setPending(false)
        } else {
          console.log(user)
          setPending(false)
        }
      }
      checkAdmin()
    })
  }, [])

  const LoginCheck = () =>
    auth.currentUser !== null ? <Navigate to={'/'} /> : <Outlet />
  const UserCheck = () =>
    auth.currentUser === null ? <Navigate to={'/'} /> : <Outlet />
  const AdminCheck = () => (isAdmin ? <Outlet /> : <Navigate to={'/'} />)

  console.log(auth.currentUser !== null ? 'true' : 'false')

  return pending ? (
    <div className='flex h-screen items-center justify-center w-full'>
      {/* <BeatLoader color='#88ceef' /> */}
      <LoadingOverlay
        loader={
          <Loader
            variant='dots'
            size={80}
          />
        }
        visible={true}
        overlayBlur={2}
      />
    </div>
  ) : (
    <>
      <LoadingOverlay
        loader={
          <Loader
            variant='dots'
            size={80}
          />
        }
        visible={actionLoading}
        overlayBlur={2}
        styles={{
          overlay: {
            position: 'fixed',
          },
        }}
      />
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
            path='/tentang'
            element={<About />}
          />
          <Route
            path='/photo-category'
            element={<PhotoCategory />}
          />
          <Route
            path='/photo-category/:id'
            element={<DetailCategory />}
          />
          <Route element={<UserCheck />}>
            <Route
              path='/photo-category/:id/payment'
              element={<Payment />}
            />
            <Route
              path='/pelunasan'
              element={<PaymentPelunasan />}
            />
          </Route>
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
          <Route
            path='/admin-signin'
            element={<AdminSignIn />}
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
            <Route
              path='/profile/notifikasi'
              element={<UserNotification />}
            />
            <Route
              path='/profile/pesanan'
              element={<Orders />}
            />
          </Route>
        </Route>

        {/* CHECK IF USER ISADMIN */}
        <Route element={<AdminCheck />}>
          <Route
            path='/admin'
            element={<AdminTemplate />}>
            <Route
              index
              element={<Dashboard />}
            />
            <Route
              path='/admin/payments'
              element={<DashPayments />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
