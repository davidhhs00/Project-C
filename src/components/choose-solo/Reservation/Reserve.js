import React from 'react'
import '../../../firebase/firebase.utils'
import { firestore, auth} from '../../../firebase/firebase.utils'

const sendReservation = async (props) => {
        const userRef = firestore.doc(`reservations/` + auth.currentUser.displayName)

        const snapShot = await userRef.get()

        if(snapShot.exists){
            const {displayName, email} = auth.currentUser
            const {workplace, startDate, endDate, timeslot} = props

            const newStartDate = startDate.format('MMMM Do YYYY')
            const newEndDate = endDate.format('MMMM Do YYYY')

            try {
                await userRef.set({
                        displayName,
                        email,
                        workplace,
                        timeslot,
                        newStartDate,
                        newEndDate    
                })
            } catch (error) {
                console.log('error sending user reservation', error.message);
            }
            return userRef
        }
        
    }

export default sendReservation;

