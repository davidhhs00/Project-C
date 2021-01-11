import React from 'react'
import '../../../firebase/firebase.utils'
import { firestore, auth} from '../../../firebase/firebase.utils';

//Add unique id so every reservation is unique and it will not be overriden.

const sendReservation = async (props, groupName, colleague1, colleague2, colleague3, colleague4) => {
        const userRef = firestore.doc(`reservations/${groupName}`)

        const snapShot = await userRef.get()
        const displayName = groupName + " (" + auth.currentUser.displayName + ")"
        const {email} = auth.currentUser
        const {workplace, dates} = props

        const firebaseDates = []
        Object.keys(dates).map((key) => {
            let eu = key.split("/")
            firebaseDates.push({Date: eu[0] + "-" + eu[1] + "-" + eu[2]+ " "+dates[key], Workplace: workplace});
        })
        console.log(groupName)
        console.log(colleague1)
        console.log(colleague2)
        console.log(colleague3)
        console.log(colleague4)

        if(!snapShot.exists){
            try {
                await userRef.set({
                        displayName,
                        email,
                        groupName,
                        colleague1,
                        colleague2,
                        colleague3,
                        colleague4,
                        workplace,
                        firebaseDates  
                })
                return true
            } catch (error) {
                console.log('error sending user reservation', error.message);
            }
            
        } else if (snapShot.exists){
            let oldDates = snapShot.data().firebaseDates
            for(var j = 0; j < firebaseDates.length; j++){
                for(var i = 0; i < oldDates.length; i++){
                    if(firebaseDates.length !== 0 && oldDates[i].split(' ')[1] === firebaseDates[j].split(' ')[1])
                    {
                        oldDates[i] = firebaseDates[j]
                        firebaseDates.splice(j, 1)
                    }
                }
            }
            for(var i = oldDates.length-1; i >= 0; i--){
                firebaseDates.unshift(oldDates[i])
            }
            let newWorkplace = workplace
            try {
                await userRef.set({
                        firebaseDates,
                        newWorkplace
                }, {merge: true})
                return true
            } catch (error) {
                console.log('error sending user reservation', error.message);
            }
        }   
}

export default sendReservation;