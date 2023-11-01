// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA8bFrHgG1Xl9ncgc8zmMvHcVzjy8wiXq8',
  authDomain: 'plantree-941e1.firebaseapp.com',
  projectId: 'plantree-941e1',
  storageBucket: 'plantree-941e1.appspot.com',
  messagingSenderId: '654938444882',
  appId: '1:654938444882:web:62575b7ab19ae2f5f17b8b',
  measurementId: 'G-H8B00XBRQX',
}

// Initialize Firebase
initializeApp(firebaseConfig)

const messaging = getMessaging()

getToken(messaging, {
  vapidKey:
    'BFKlXjEpVzo5xiulX46GUQ75O7_e4juJxDjUM95llfupPAwlkRFAnsWNq01ORRTxKCr0AxXhOlS1VDEiWyVtQD4',
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
