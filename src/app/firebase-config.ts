import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyC4815XN4YxsnwapctCLIMgSyPOicU2_Y8",
  authDomain: "reykjavik-47907.firebaseapp.com",
  projectId: "reykjavik-47907",
  storageBucket: "reykjavik-47907.appspot.com",
  messagingSenderId: "43955062786",
  appId: "1:43955062786:web:9f5763c18c045c10147f1b"
}

const firebaseApp = initializeApp(firebaseConfig);

export const database = getFirestore(firebaseApp);