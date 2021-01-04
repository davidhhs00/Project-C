import React from 'react';

const giveRangeDates = (props) => {
    const startDate = new Date(props.startdate),
          endDate = new Date(props.enddate),
          difference = (endDate-startDate)/864e5, // represents the number of milliseconds
          dateFormat = { weekday: 'long', year:'numeric', month: 'numeric', day:'numeric'}, //Dateformate
          dates = Array.from( //shallow-copied Array instance from an array-like or iterable object
            {length: difference+1},
            (_,i) => {
              const date = new Date() 
              date.setDate(startDate.getDate()+i)
              const [weekdayStr, dateStr] = date.toLocaleDateString('en-US',dateFormat).split(', ')
              return `${weekdayStr} ${dateStr}`
            }
          )
          const calDates = {};
          dates.forEach((key, i) => (
            calDates[key] = "8:30-11:00"
          ))
          
    return (
      calDates
    )

}

export default giveRangeDates