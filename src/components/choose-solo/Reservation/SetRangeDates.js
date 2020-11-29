import React from 'react';

//"2020-12-02"
const giveRangeDates = (props) => {
    const startDate = new Date(props.newStartDate),
          endDate = new Date(props.newEndDate),
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
    return (
        dates
    )

}



export default giveRangeDates