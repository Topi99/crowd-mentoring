import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.auth.useDeviceLanguage();
    this.db = app.firestore();
    this.firestore = app.firestore;
    this.storage = app.storage();
  }

  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword = (email, password) => {
    this.auth.signInWithEmailAndPassword(email, password);
  }

  getCurrentUser = () => this.auth.currentUser;

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => {
    let err = null;
    this.auth.sendPasswordResetEmail(email).catch(e => err = e);
    return err;
  }

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  user = uid => this.db.collection("users").doc(uid);
  users = () => this.db.collection('users');
}

export default Firebase;