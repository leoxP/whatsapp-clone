import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBEVDQyXg8sP7VM1Nb904Lo8gjxO8N8b1M",
    authDomain: "whatsapp-clone-59979.firebaseapp.com",
    projectId: "whatsapp-clone-59979",
    storageBucket: "whatsapp-clone-59979.appspot.com",
    messagingSenderId: "66698926010",
    appId: "1:66698926010:web:8580cfffdd5cfa19fc6f83",
    measurementId: "G-ZZPNWY00N1"
  };
 
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  export {auth,provider,db};