import { app } from "firebase";
import React from "react";
import { firestore, auth } from '../../firebase/firebase.utils'
import './your-bookings-solo.styles.scss';

class yourBookingsSolo extends React.Component{
  constructor(props) {
    
    super(props);
   
    this.state = {reservations : []}
    }

  componentDidMount(){
      console.log('hij werkt')
      firestore.collection('reservations')
        .get()
        .then( snapshot => {
          let reservations = [];
          snapshot.forEach( doc => {
            const data = doc.data()
            reservations.push(data)
          })
          this.setState({ reservations: reservations })
        })
        .catch(error => console.log(error))
  }
  
  render(){
    return(
    <div>
      
      <table id='reservations'>  
      <thead>
          <tr>
            <th>Who?</th>
            <th>When?</th>
            <th>Timeslot</th>
            <th>Workplace</th>  
          </tr>
        </thead>
        
        <tbody> 
        {this.state.reservations.map(data => {
        return(
        <tr>
          <td>{data.displayName}</td>
          <td>{data.newStartDate}</td>
          <td>{data.timeslot}</td>
          <td>{data.workplace}</td>          
        </tr>
        );
        })}
        </tbody>
      </table>

        <button onClick={event =>  window.location.href='/home'} id="backButton">Back</button>

    </div>
    )
  }
}
export default yourBookingsSolo;
