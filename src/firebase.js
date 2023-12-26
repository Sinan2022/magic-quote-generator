import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWogsKMBGOHUIOSgRrVwIWUzB7h007_SQ",
  authDomain: "ngo-registration-75ae0.firebaseapp.com",
  projectId: "ngo-registration-75ae0",
  storageBucket: "ngo-registration-75ae0.appspot.com",
  messagingSenderId: "566029320992",
  appId: "1:566029320992:web:7c6f61c7142d4ae40b8d45",
  measurementId: "G-6Z38NTW2P5"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const storageRef = ref(storage);
