import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyAZKJnSWm9L0urRx_5FHZg2nrOs0b6NzOU",
	authDomain: "clone-f67da.firebaseapp.com",
	projectId: "clone-f67da",
	storageBucket: "clone-f67da.appspot.com",
	messagingSenderId: "459814470762",
	appId: "1:459814470762:web:30cf2a92ccf6257db8f613",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
