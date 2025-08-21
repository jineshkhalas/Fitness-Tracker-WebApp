// firebase-config.js (USE THIS VERSION FOR BROWSER WITHOUT BUNDLER)

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "xxxxxxxxxxxxx",
    authDomain: "fitness-tracker-web-app-28777.firebaseapp.com",
    projectId: "fitness-tracker-web-app-28777",
    storageBucket: "fitness-tracker-web-app-28777.appspot.com",
    messagingSenderId: "xxxxxxxxx",
    appId: "xxxxxxxxxxx",
    measurementId: "xxxxxxxxx"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Auth and Firestore references
const auth = firebase.auth();
const db = firebase.firestore();

// Gemini API Key (for calorie scanner)
const GEMINI_API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxx";