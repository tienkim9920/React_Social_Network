import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyBpKGIKcJPski1Rg_c0LvE_qQz0asBqVxA",
    authDomain: "todo-app-tienkim.firebaseapp.com",
    databaseURL: "https://todo-app-tienkim.firebaseio.com",
    projectId: "todo-app-tienkim",
    storageBucket: "todo-app-tienkim.appspot.com",
    messagingSenderId: "513400048747",
    appId: "1:513400048747:web:b062ff959830acf0ef752e",
    measurementId: "G-X1ZCS5H953"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export { storage, firebase as default }