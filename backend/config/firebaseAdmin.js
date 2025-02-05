import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

let serviceAccount;

try {
  serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);
} catch (error) {
  console.error("Invalid Firebase Admin SDK JSON:", error);
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.error("Firebase Admin SDK credentials not found. Check your .env file.");
}

export default admin;
