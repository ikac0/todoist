import { firebase } from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAU91WCv4RsZ6CunGJ9GNE2MoibCHj7VOg",
  authDomain: "airbnb-742ad.firebaseapp.com",
  projectId: "airbnb-742ad",
  storageBucket: "airbnb-742ad.appspot.com",
  messagingSenderId: "974231758025",
  appId: "1:974231758025:web:01f19ee8494b51008a9918",
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export { config as firebase };
