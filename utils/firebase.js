import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../firebaseConfig'



if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}else {
   firebase.app(); // if already initialized, use that one
}

export const firestore = firebase.firestore()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export default firebase
