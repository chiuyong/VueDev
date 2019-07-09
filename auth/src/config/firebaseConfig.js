import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
  apiKey: "AIzaSyAY8fgLK65Utx_uZrmHSiirNWrf7E6L_Rc",
  authDomain: "chiu-yc-c90f0.firebaseapp.com",
  databaseURL: "https://chiu-yc-c90f0.firebaseio.com",
  projectId: "chiu-yc-c90f0",
  storageBucket: "",
  messagingSenderId: "914024645456",
  appId: "1:914024645456:web:f3fd9126be04fb7a"  
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')

export {
    db,
    auth,
    currentUser,
    usersCollection
}