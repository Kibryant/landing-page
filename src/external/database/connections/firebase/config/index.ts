import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: 'landing-page-aad23.appspot.com',
    messagingSenderId: '226624414503',
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

const firebase = initializeApp(firebaseConfig)
const storage = getStorage(firebase)
const db = getFirestore(firebase)
const auth = getAuth(firebase)
const googleProvider = new GoogleAuthProvider()

export { storage, firebase, db, auth, googleProvider }
