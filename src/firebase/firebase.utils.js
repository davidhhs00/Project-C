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
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email, photoURL } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                admin: false,
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

// Get notification with users ID
export const findNotification = async (receiverID) => {
    try {
        var notification = await firestore.collection("notifications");
        var filteredNotifications = await notification.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
                if (doc.data().receiverID === receiverID && doc.data().answer === "") return { id: doc.id, ...doc.data() }
                return null;
            })
            var filteredDoc = tempDoc.filter((e) => {
                return e != null;
            });
            console.log(filteredDoc);
            return filteredDoc;
        })
        console.log(filteredNotifications)
        return filteredNotifications;
    } catch (error) {
        console.log('error while getting notifications', error.message);
    }
}

// Update the answer for the notification using notificationID and the chosen answer
export const sendNotificationReply = async (notificationID, reply) => {
    if (!notificationID) return;

    const notificationRef = firestore.doc(`notifications/${notificationID}`);

    return notificationRef.update({
        answer: reply
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    })
}

// Create notification
export const createNotification = async (senderID, receiverID, notification) => {
    if (!notification) return;

    const notificationRef =  firestore.collection("notifications").doc();
    try {
        notificationRef.set({
            answer: "",
            notification: notification,
            receiverID: receiverID,
            senderID: senderID
        });
        console.log("Succesfully created a notification");
    } catch (error) {
        console.log('Something went wrong when trying to create a notification', error.message);
    }
    }

// Get all registered user from the database
export const getAllUsers = async () => {
    try {
        const userRef = await firestore.collection("users");
        var userArray = await userRef.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => { return { id: doc.id, ...doc.data() } })
            return tempDoc;
        })
        return userArray;
    } catch (error) {
        console.log("Error while fetching all users", error.message);
    }
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;