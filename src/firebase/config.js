//// burada google firebase ile etkileşime buradan girilecek.// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//authentication işlemleri için griş ve yetkilendirme 

import {getAuth} from "firebase/auth"

// firestore database erişimi için(verilerin kayıt yeri)
import {getFirestore} from "firebase/firestore"

//storage erişimi için (resim kayıt yeri)
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7VAwkjPBjDed-B8oXgx3zcBiDMGwSlTc",
  authDomain: "ecommerceclass-5205a.firebaseapp.com",
  projectId: "ecommerceclass-5205a",
  storageBucket: "ecommerceclass-5205a.appspot.com",
  messagingSenderId: "810430772065",
  appId: "1:810430772065:web:5bd09846b9fdc631d90b20"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app