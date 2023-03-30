import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/signup'
import { SignIn } from './pages/signin'
import { MainTemplate } from './components/templates/mainTemplate'
import { HomePage } from './pages/homepage'
import { Gallery } from './pages/gallery'

function App() {

  return (
    <Routes>
      {/* main */}
      <Route
        path='/'
        element={<MainTemplate />}
      >
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path='/gallery'
          element={<Gallery />}
        />
      </Route>

      {/* <Route 
      element={<LoginCheckReverse />}
      > */}
      <Route
        path='/signup'
        element={<SignUp />}
      />
      <Route
        path='/signin'
        element={<SignIn />}
      />
      {/* <Route
          path='/signin'
          element={<Signin />}
        /> */}
      {/* </Route> */}
    </Routes>
  )
}

export default App
