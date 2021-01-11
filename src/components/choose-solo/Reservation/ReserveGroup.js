import React from 'react'
import '../../../firebase/firebase.utils'
import { firestore, auth} from '../../../firebase/firebase.utils';

//Add unique id so every reservation is unique and it will not be overriden.

const sendReservation = async (props, groupName, colleague1, colleague2, colleague3, colleague4) => {
        const userRef = firestore.doc(`reservations/${auth.currentUser.email}_${groupName}`)

        const snapShot = await userRef.get()
        const displayName = groupName + " (" + auth.currentUser.displayName + ")"
        const {email} = auth.currentUser
        const {workplace, dates} = props

        const firebaseDates = []
        Object.keys(dates).map((key) => {
            let eu = key.split("/")
            let fst = eu[0].split(" ")[0]
            let snd = eu[0].split(" ")[1]
            firebaseDates.push({Date: fst + " "+ eu[1] + "-" + snd + "-" + eu[2]+ " "+dates[key], Workplace: workplace});
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
            let storedDates = snapShot.data().firebaseDates
            if(typeof storedDates !== "undefined"){
                Object.keys(firebaseDates).map((newKey) => {
                    Object.keys(storedDates).map((oldKey) => {
                        if(firebaseDates !== []){
                            console.log(typeof firebaseDates)
                            let newDate = firebaseDates[newKey]['Date'].split(' ')[1]
                            let oldDate = storedDates[oldKey]['Date'].split(' ')[1]
                            let newTime = firebaseDates[newKey]['Date'].split(' ')[2]
                            let oldTime = storedDates[oldKey]['Date'].split(' ')[2]
                            if(newDate === oldDate && newTime === oldTime){
                                storedDates[oldKey] = firebaseDates[newKey]
                                delete firebaseDates[newKey]
                                console.log(storedDates)
                            }
                    }
                    })
                })
            }
        }   
}

export default sendReservation;