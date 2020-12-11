import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCqqaECuNcNjCBz2zuT3_z6fVy5p4_6sGg",
    authDomain: "bondsonauction.firebaseapp.com",
    databaseURL: "https://bondsonauction.firebaseio.com",
    projectId: "bondsonauction",
    storageBucket: "bondsonauction.appspot.com",
    messagingSenderId: "863041515442",
    appId: "1:863041515442:web:7b600e70f6551e261c3eab",
    measurementId: "G-X7MSP8YWPF"
})


const db = firebaseApp.firestore()
const auth = firebase.auth()

export{db, auth}