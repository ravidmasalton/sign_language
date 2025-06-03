import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCc2oyzodIgDkwDmSg-FQMKh0BOEjt-WYw",
  authDomain: "signlanguageapp-26fc1.firebaseapp.com",
  projectId: "signlanguageapp-26fc1",
  storageBucket: "signlanguageapp-26fc1.firebasestorage.app",
  messagingSenderId: "260710283824",
  appId: "1:260710283824:web:25350d734eefa41c07cbf5",
  measurementId: "G-PD40SXMW76"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
export default firebaseConfig;