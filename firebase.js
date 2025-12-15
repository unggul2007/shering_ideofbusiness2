const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT.firebaseapp.com",
  projectId: "PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
