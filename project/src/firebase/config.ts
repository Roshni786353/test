import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn9L6qrawa8MkrzflG1VtpO2tDVNj5nlU",
  authDomain: "multitool-web.firebaseapp.com",
  projectId: "multitool-web",
  storageBucket: "multitool-web.firebasestorage.app",
  messagingSenderId: "954441421537",
  appId: "1:954441421537:web:325c956f767d5b0b64dda0",
  measurementId: "G-5CY05JNC4Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;