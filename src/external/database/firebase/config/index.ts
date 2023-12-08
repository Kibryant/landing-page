import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export { app, analytics }
