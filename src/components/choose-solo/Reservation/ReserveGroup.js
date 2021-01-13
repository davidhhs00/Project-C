import React from 'react'
import '../../../firebase/firebase.utils'
import { firestore, auth} from '../../../firebase/firebase.utils';

//Add unique id so every reservation is unique and it will not be overriden.

const SendReservation = async (props, groupName, colleague1, colleague2, colleague3, colleague4, cName1, cName2, cName3, cName4) => {
    var amountofColleagues = 1
    
    if (colleague1 !== ""){
        amountofColleagues++
    }

    if (colleague2 !== ""){
        amountofColleagues++
    }

    if (colleague3 !== ""){
        amountofColleagues++
    }

    if (colleague4 !== ""){
        amountofColleagues++
    }


    const userRef = firestore.doc(`reservations/${groupName}_${auth.currentUser.email}_${colleague1}_${colleague2}_${colleague3}_${colleague4}`)

    const snapShot = await userRef.get()
    const displayName = `Group: ${groupName} (Reserved by: ${auth.currentUser.displayName} ${cName1} ${cName2} ${cName3} ${cName4})`
    const {email} = auth.currentUser
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
                groupName,
                colleague1,
                colleague2,
                colleague3,
                colleague4,
                workplace,
                firebaseDates,
                colleagues_total: amountofColleagues  
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