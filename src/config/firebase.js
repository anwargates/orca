// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCL66wm2dRmExrrUw7n-oO-F9EdIdh2-3Q',
  authDomain: 'orca-base.firebaseapp.com',
  projectId: 'orca-base',
  storageBucket: 'orca-base.appspot.com',
  messagingSenderId: '651308068651',
  appId: '1:651308068651:web:5bb0678d775455bcbc1f6e',
  measurementId: 'G-QG8QLNBDKH',
  databaseURL: 'https://orca-base-default-rtdb.firebaseio.com/',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
export const database = getDatabase(app)
