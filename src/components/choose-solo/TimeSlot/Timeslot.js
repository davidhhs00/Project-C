import React from 'react';
import './Timeslot.css'

//Make key value dict that maps over the keys and let user fill in the values
//Probably make select 


const Timeslot = (props) => {

    return (
        props.dates.map((key) => (
            <select
              className="timeslot"
              type="select"
              key={key}
            >
              <option value="09:00-13:00">09:00-13:00</option>
              <option value="09:00-17:00">09:00-17:00</option>
              <option value="13:00-17:00">13:00-17:00</option>
            </select>
        )
    ))
}


export default Timeslot