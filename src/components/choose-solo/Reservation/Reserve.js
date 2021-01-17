import React from 'react'
import '../../../firebase/firebase.utils'
import { firestore, auth} from '../../../firebase/firebase.utils';

let currentDate = new Date();

const checkDate = (date) =>{
    let newdate = date.split('-')
    let usedate = newdate.reverse().join('-')
    let dbDate = new Date(usedate)
    
    if(dbDate.getTime() < currentDate.getTime()){
        if(dbDate.toLocaleDateString() == currentDate.toLocaleDateString()){
            return true
        }
        return false
    }
    return true
}

const sendReservation = async (props) => {
        const userRef = firestore.doc(`reservations/${auth.currentUser.email}`)

        const snapShot = await userRef.get()
        const {displayName, email} = auth.currentUser
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
                        colleagues_total: 1  
                })
                return true
            } catch (error) {
                console.log('error sending user reservation', error.message);
            }
            
        } else if (snapShot.exists){
            let storedDates = snapShot.data().firebaseDates
            if(typeof storedDates !== "undefined"){
                for(var j = 0; j < storedDates.length; j++){
                    if(checkDate(storedDates[j]['Date'].split(' ')[1])){
                        for(var i = 0; i < firebaseDates.length; i++){
                            let newDate = firebaseDates[i]['Date'].split(' ')[1]
                            let oldDate = storedDates[j]['Date'].split(' ')[1]
                            let newTime = firebaseDates[i]['Date'].split(' ')[2]
                            let oldTime = storedDates[j]['Date'].split(' ')[2]
                            if(newDate == oldDate && newTime == oldTime){
                                storedDates[j] = firebaseDates[i]
                                firebaseDates.splice(i, 1)
                            }
                        }}else {
                            storedDates.splice(j, 1)
                        }
                    }
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

export default sendReservation;

