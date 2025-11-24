import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID
};

//projectFirestore.settings({ experimentalAutoDetectLongPolling: true });

//init firebase
initializeApp(firebaseConfig);

//init firestore
const db = getFirestore();

//init auth
const auth = getAuth();

const timestamp = Timestamp;

export { db, auth, timestamp } 
  