import React from 'react'
import '../../../firebase/firebase.utils'
import { firestore, auth} from '../../../firebase/firebase.utils'
import SetRangeDates from './SetRangeDates'

const sendReservation = async (props) => {
        const userRef = firestore.doc(`reservations/` + auth.currentUser.displayName)

        const snapShot = await userRef.get()

        if(snapShot.exists){
            const {displayName, email} = auth.currentUser
            const {workplace, dates} = props


            try {
                await userRef.set({
                        displayName,
                        email,
                        workplace,
                        dates  
                })
            } catch (error) {
                console.log('error sending user reservation', error.message);
            }
            return userRef
        }
        
    }

export default sendReservation;

