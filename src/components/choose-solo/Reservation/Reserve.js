import React from 'react'
import '../../../firebase/firebase.utils'
import { firestore, auth} from '../../../firebase/firebase.utils'
import SetRangeDates from './SetRangeDates'

const sendReservation = async (props) => {
        const userRef = firestore.doc(`reservations/` + auth.currentUser.displayName)

        const snapShot = await userRef.get()

        if(snapShot.exists){
            const {displayName, email} = auth.currentUser
            const {workplace, startDate, endDate, timeslot} = props

            //Maybe add file for error handling?
            const newStartDate = (startDate) ? startDate.format('YYYY-MM-DD') : ""
            const newEndDate = (endDate) ? endDate.format('YYYY-MM-DD') : ""

            let ReservedDates = ""
            
            if(newStartDate !== "" && newEndDate !== "" ) {
                ReservedDates = SetRangeDates({newStartDate, newEndDate})
            } else if(newStartDate === "" || newEndDate === ""){
                ReservedDates = (newStartDate) ? newStartDate : newEndDate
            } else {
                return;
            }
        
            try {
                await userRef.set({
                        displayName,
                        email,
                        workplace,
                        timeslot,
                        ReservedDates  
                })
            } catch (error) {
                console.log('error sending user reservation', error.message);
            }
            return userRef
        }
        
    }

export default sendReservation;

