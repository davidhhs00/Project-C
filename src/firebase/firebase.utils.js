import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDpfFHATPm9yV3eTwP5iOGfpy4bb1swoOw",
    authDomain: "ngti-workplace.firebaseapp.com",
    databaseURL: "https://ngti-workplace.firebaseio.com",
    projectId: "ngti-workplace",
    storageBucket: "ngti-workplace.appspot.com",
    messagingSenderId: "899935600703",
    appId: "1:899935600703:web:b9a9a9ebef289e732af88a",
    measurementId: "G-Q9DKFKB4TQ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    console.log(userAuth);
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email, photoURL } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const placeReservation = async (data) => {
    const { email, time, workplace } = data;

    try {
        var newReservationRef = firestore.collection("reservations").doc();

        newReservationRef.set({
            email,
            time,
            workplace
        });
    } catch (error) {
        console.log('error creating reservation', error.message);
    }
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;