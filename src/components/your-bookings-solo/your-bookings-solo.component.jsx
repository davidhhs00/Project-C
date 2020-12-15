import { app } from "firebase";
import React from "react";
import { firestore, auth } from '../../firebase/firebase.utils'
import * as firebase from 'firebase';
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
  
  removeToCollection(e) {
    const userUid = firebase.auth().currentUser.uid
    let key = "    kjWanJnzRHGWN6Gh2avm    "
    firebase.database().ref(`users/${userUid}/collection/${key}`).remove()

  }

  render(){
    return(
    <div>
      
      <table id='reservations'>  
      <thead>
          <tr>
            <th>Who?</th>
            <th>When?</th>
            <th>Workplace</th>  
            <th></th>
          </tr>
        </thead>
        
        <tbody> 
        {this.state.reservations.map((data, i) => {
        return(
        <tr>
          <td>{data.displayName}</td>
          <td>{data.dates}</td>
          <td>{data.workplace}</td>          
          <td> <button onClick={this.removeToCollection.bind(this, i)} id="deleteButton">Delete</button> </td>
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