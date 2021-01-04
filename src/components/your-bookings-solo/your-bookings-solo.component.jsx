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
      console.log('hij mount je weet toch')
      firestore.collection('reservations')
        .get()
        .then( snapshot => {
          let reservations = [];
          let documentid = [];
          snapshot.forEach( doc => {
            const data = doc.data()
            const docID = doc.id
            reservations.push(data)
            documentid.push(docID)
            console.log(documentid)
            console.log(data.firebaseDates)
          })
          this.setState({ reservations: reservations })
          this.setState({ documentid: documentid })
        })
        .catch(error => console.log(error))
  }
  
  removeToCollection(i) {
    let key = this.state.documentid[i]
    console.log(key)
    firebase.firestore().collection("reservations").doc(key).delete()
    setTimeout(function(){window.location.reload(true);}, 500)
  }

  Dates(x){
    var text = ""
      for(let i = 0; i < x.length; i++){
        if(i < x.length-1){
          text += x[i] + ", "
        }
        else{
          text += x[i]
        }
      }
      return(text)
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
          <td>{this.Dates(data.firebaseDates)}</td>
          <td>{data.workplace}</td>          
          <td> <button onClick={event => this.removeToCollection(i)} id="deleteButton">Delete</button> </td>
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
