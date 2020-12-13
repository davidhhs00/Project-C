import React from 'react'
import '../../../firebase/firebase.utils'
import { firestore, auth} from '../../../firebase/firebase.utils';

//Add unique id so every reservation is unique and it will not be overriden.

const sendReservation = async (props) => {
        const userRef = firestore.doc(`reservations/${auth.currentUser.displayName}`)

        const snapShot = await userRef.get()
        const {displayName, email} = auth.currentUser
        const {workplace, dates} = props
        
        const firebaseDates = []
        Object.keys(dates).map((key) => {
            let eu = key.split("/")
            console.log(eu)
            firebaseDates.push(eu[1] + "-" + eu[0] + "-" + eu[2]+ " "+dates[key]);
        })

        if(!snapShot.exists){
            try {
                await userRef.set({
                        displayName,
                        email,
                        workplace,
                        firebaseDates  
                })
            } catch (error) {
                console.log('error sending user reservation', error.message);
            }
            return userRef
        } else if (snapShot.exists){
            try {
                await userRef.set({
                        displayName,
                        email,
                        workplace,
                        firebaseDates  
                })
            } catch (error) {
                console.log('error sending user reservation', error.message);
            }
        }
        
    }

export default sendReservation;

