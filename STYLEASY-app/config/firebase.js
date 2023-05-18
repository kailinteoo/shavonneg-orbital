import firebase from 'firebase';

class firebase {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyDCu7N_tGoQIiI_16d-9sCLBVVu2oiXVnE",
                authDomain: "styleasy-app.firebaseapp.com",
                projectId: "styleasy-app",
                storageBucket: "styleasy-app.appspot.com",
                messagingSenderId: "583024040235",
                appId: "1:583024040235:web:c71d949cf9293dc0a94d6e",
                measurementId: "G-J3H4T4LJ5H"
            });
        }
    };
}




/*import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

//Firebase config
const firebaseConfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId,
    databaseURL: Constants.manifest.extra.databaseURL
};

// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();*/