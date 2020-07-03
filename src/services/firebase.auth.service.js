import firebase from 'firebase/app'
import { notification } from 'antd'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBOWfLl_EoXMyKy9-gKbiHVHKC7UCixAe8',
  authDomain: 'ventus-e8164.firebaseapp.com',
  databaseURL: 'https://ventus-e8164.firebaseio.com',
  projectId: 'ventus-e8164',
  storageBucket: 'ventus-e8164.appspot.com',
  messagingSenderId: '639759208106',
  appId: '1:639759208106:web:e2962e6f13a62633cc0ad3',
  measurementId: 'G-YEW5P44ZVY',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebase.auth()
export default firebaseApp

export async function login() {
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.addScope('profile')
  provider.addScope('email')
  return firebaseAuth
    .signInWithPopup(provider)
    .then(function x(result) {
      console.log(`Token: ${JSON.stringify(result)}`)
      return true
    })
    .catch(error =>
      notification.warning({
        message: error.code,
        description: error.message,
      }),
    )
}

export async function currentAccount() {
  function getCurrentUser(auth) {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          user.getIdToken().then(function x(idToken) {
            localStorage.setItem('token', idToken)
          })
        }
        unsubscribe()
        resolve(user)
      }, reject)
    })
  }
  return getCurrentUser(firebaseAuth)
}

export async function logout() {
  return firebaseAuth.signOut().then(() => true)
}
