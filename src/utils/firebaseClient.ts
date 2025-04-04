// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";
import dotenv from "dotenv"

dotenv.config()

const apiKey = process.env.NEXT_PUBLIC_CLIENT_API_KEY
const authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
const storageBucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET
const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID
const appId = process.env.NEXT_PUBLIC_APP_ID
const measurementId = process.env.NEXT_PUBLIC_MEASUREMENT_ID

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
}

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()
export { app, auth, googleProvider }