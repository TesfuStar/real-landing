import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAMCXTjIu7ccyKG7Y-v9vv4NV73e90NaxM",
  authDomain: "real-estate-project-eccdf.firebaseapp.com",
  projectId: "real-estate-project-eccdf",
  storageBucket: "real-estate-project-eccdf.appspot.com",
  messagingSenderId: "700473988358",
  appId: "1:700473988358:web:66d36d5618e90ffdd8ba87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;