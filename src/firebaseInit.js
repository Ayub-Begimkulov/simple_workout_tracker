import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyAdP5tWW-eJ0l_bhKA3UNn8D_w76BA8Q1E",
  authDomain: "workout-log-fc765.firebaseapp.com",
  databaseURL: "https://workout-log-fc765.firebaseio.com",
  projectId: "workout-log-fc765",
  storageBucket: "workout-log-fc765.appspot.com",
  messagingSenderId: "349106013200"
}

const app = firebase.initializeApp(config)
const db = app.firestore()
db.enablePersistence()
export default db

const auth = firebase.auth()
export { auth }