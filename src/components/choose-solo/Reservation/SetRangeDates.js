import React from 'react';


const giveRangeDates = (props) => {
    const startDate = new Date(props.startdate),
          endDate = new Date(props.enddate),
          difference = (endDate-startDate)/864e5, // represents the number of milliseconds
          dateFormat = {weekday: 'short', day:'numeric', month: 'short', year:'numeric'}, //Dateformate
          dates = Array.from( //shallow-copied Array instance from an array-like or iterable object
            {length: difference+1},
            (_,i) => {
              const date = new Date() 
              date.setDate(startDate.getDate()+i)
              const [weekdayStr, dateStr] = date.toLocaleDateString('en-GB',dateFormat).split(', ')
              return `${dateStr} ${weekdayStr}`
            }
          )
          const datesDict = {}
          dates.forEach((key) => (
            datesDict[key] = "09:00-13:00"
          ))
    return (
      datesDict
    )

}



export default giveRangeDates