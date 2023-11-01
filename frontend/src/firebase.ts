// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const API_KEY = import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY
const AUTH_DOMAIN = import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN
const PROJECT_ID = import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID
const STORAGE_BUCKET = import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET
const MESSAGING_SENDER_ID = import.meta.env
  .VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
const APP_ID = import.meta.env.VITE_PUBLIC_FIREBASE_APP_ID
const MEASUREMENT_ID = import.meta.env.VITE_PUBLIC_FIREBASE_MEASUREMENT_ID
const VAPID_ID = import.meta.env.VITE_PUBLIC_FIREBASE_VAPID_ID

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
}

// Initialize Firebase
initializeApp(firebaseConfig)

const messaging = getMessaging()

getToken(messaging, {
  vapidKey: VAPID_ID,
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log(currentToken)
    } else {
      // Show permission request UI
      console.log(
        'No registration token available. Request permission to generate one.',
      )
      // ...
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err)
    // ...
  })
