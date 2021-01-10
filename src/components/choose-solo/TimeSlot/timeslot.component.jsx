import React from 'react';
import styles from './timeslot.styles.scss';


export default class TimeSlot extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            Object.entries(this.props.dates ? this.props.dates : "").map((key, i) => (
                <div key={i}>
                <h3 className="welcome">{key[0].split(' ')[0]}</h3>
                <select
                  className="timeslot"
                  type="select"
                  key={key}
                  name={key[0]}
                  value={key[1]}
                  onChange={this.props.onSetTime}
                >
                  <option value="8:30-11:00">MORNING</option>
                  <option value="11:15-14:00">AFTERNOON</option>
                  <option value="14:15-17:00">EVENING</option>
                  <option value="8:30-17:00">ALL DAY</option>
                </select>
                </div>
            ))
        )
    }
}