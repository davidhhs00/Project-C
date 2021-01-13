import React from 'react'
import '../../../firebase/firebase.utils'
import { firestore, auth} from '../../../firebase/firebase.utils';

//Add unique id so every reservation is unique and it will not be overriden.

const SendReservation = async (props, groupName, colleague1, colleague2, colleague3, colleague4, cName1, cName2, cName3, cName4) => {
    if(colleague1 !== ""){
        Reservation(props, cName1, colleague1)
    }
    if(colleague2 !== ""){
        Reservation(props, cName2, colleague2)
    }
    if(colleague3 !== ""){
        Reservation(props, cName3, colleague3)
    }
    if(colleague4 !== ""){
        Reservation(props, cName4, colleague4)
    }
    Reservation(props, auth.currentUser.displayName, auth.currentUser.email)
    .then(() => {window.location.href='/home'})
}

const Reservation = async (props, displayName, email) => {

    const userRef = firestore.doc(`reservations/${email}`)

    const snapShot = await userRef.get()
    const {workplace, dates} = props

    const firebaseDates = []
    Object.keys(dates).map((key) => {
        let eu = key.split("/")
        let fst = eu[0].split(" ")[0]
        let snd = eu[0].split(" ")[1]
        firebaseDates.push({Date: fst + " "+ eu[1] + "-" + snd + "-" + eu[2]+ " "+dates[key], Workplace: workplace});
    })

    if(!snapShot.exists){
        try {
            await userRef.set({
                displayName,
                email,
                workplace,
                firebaseDates,
            })
            return true
        } catch (error) {
            console.log('error sending user reservation', error.message);
        }
        
    } else if (snapShot.exists){
        let storedDates = snapShot.data().firebaseDates
        if(typeof storedDates !== "undefined"){
            for(var j = 0; j < storedDates.length; j++){
                for(var i = 0; i < firebaseDates.length; i++){
                    let newDate = firebaseDates[i]['Date'].split(' ')[1]
                    let oldDate = storedDates[j]['Date'].split(' ')[1]
                    let newTime = firebaseDates[i]['Date'].split(' ')[2]
                    let oldTime = storedDates[j]['Date'].split(' ')[2]
                    if(newDate === oldDate && newTime === oldTime){
                        storedDates[j] = firebaseDates[i]
                        firebaseDates.splice(i, 1)
                    }
                }}
            for(var i = storedDates.length-1; i >= 0; i--){
                    firebaseDates.unshift(storedDates[i])
                }
            }
        try {
            await userRef.set({
                firebaseDates,
                workplace
            }, {merge: true})
            return true
        } catch (error) {
            console.log('error sending user reservation', error.message);
        }
    }
}

export default SendReservation;