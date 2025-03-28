// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.CLIENT_API_KEY
const authDomain = process.env.AUTH_DOMAIN
const projectId = process.env.PROJECT_ID
const storageBucket = process.env.STORAGE_BUCKET
const messagingSenderId = process.env.MESSAGING_SENDER_ID
const appId = process.env.APP_ID
const measurementId = process.env.MEASUREMENT_ID

const firebaseConfig = {
  apiKey: "AIzaSyBMl-z1fyMDksyJbZefONPZ1mhPCWsP0aI",
  authDomain: "icongenerator-3b3b4.firebaseapp.com",
  projectId: "icongenerator-f0f28",
  storageBucket: "icongenerator-f0f28.firebasestorage.app",
  messagingSenderId: "209076786201",
  appId: "1:209076786201:web:a34bbf1192f7673b514688",
  measurementId: "G-Q6259D0ZFC"
}

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app, auth }