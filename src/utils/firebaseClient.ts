// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import dotenv from "dotenv"

dotenv.config()

const apiKey = process.env.CLIENT_API_KEY
const authDomain = process.env.AUTH_DOMAIN
const projectId = process.env.PROJECT_ID
const storageBucket = process.env.STORAGE_BUCKET
const messagingSenderId = process.env.MESSAGING_SENDER_ID
const appId = process.env.APP_ID
const measurementId = process.env.MEASUREMENT_ID

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
export { app, auth }