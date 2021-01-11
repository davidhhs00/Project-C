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
               


                // for(var j = 0; j < firebaseDates.length; j++){
                //     for(var i = 0; i < oldDates.length; i++){
                //         if(Object.values(firebaseDates[j])[0].split(' ')[1] === Object.values(firebaseDates[j])[0].split(' ')[1]){
                //             console.log("True")
                //             console.log(Object.values(firebaseDates[j])[0].split(' ')[1])
                //             // console.log(Object.values(firebaseDates[j])[0].split(' ')[1])
                //         //     if(Object.values(oldDates[i])[0].split(' ')[1] == )
                //         }

                        // if(firebaseDates.length !== 0 && oldDates[i].split(' ')[1] === firebaseDates[j].split(' ')[1])
                        // {
                        //     oldDates[i] = firebaseDates[j]
                        //     firebaseDates.splice(j, 1)
                        // }
                    // }
                // }
            }
            //     for(var i = oldDates.length-1; i >= 0; i--){
            //         firebaseDates.unshift(oldDates[i])
            //     }
            // }
            // try {
            //     await userRef.set({
            //             firebaseDates
            //     }, {merge: true})
            //     return true
            // } catch (error) {
            //     console.log('error sending user reservation', error.message);
            // }
        }
        
    }

export default sendReservation;

