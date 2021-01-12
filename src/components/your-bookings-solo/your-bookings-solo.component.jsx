// Import van firebase, styling en react
import { connect } from 'react-redux';
import React from "react";
import { firestore } from '../../firebase/firebase.utils'
import * as firebase from 'firebase';
import './your-bookings-solo.styles.scss';


class yourBookingsSolo extends React.Component{
  constructor(props) {
    
    super(props);

    this.state = {
      reservations : [],
      }
    }
  
  componentDidMount(){
      console.log('hij mount je weet toch')

      //Alle reservaties uit de database halen
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
  
  //Verwijdert de correcte reservering uit de database.
  removeToCollection(i) {
    let key = this.state.documentid[i]
    console.log(key)
    firebase.firestore().collection("reservations").doc(key).delete()
    setTimeout(function(){window.location.reload(true);}, 500)
  }

  // Bijbehorende functie van CheckEmailandAdmin()
  // Checkt of je email hetzelfde is en of je admin bent
  isAuth(x, y, z, a){
    if (x === y){
      this.removeToCollection(z)
    }
    if (a){
      this.removeToCollection(z)
      //console.log('admin detected')
    }
    else{
      console.log(x, y, z, a)
    }
  }

  //Schrijft de datums van de reservaties uit.
  Dates(x){
    var text = ""
      for(let i = 0; i < x.length; i++){
        if(i < x.length-1){
          text += x[i].Date + ", "
        }
        else{
          text += x[i].Date
        }
      }
      return(text)
  }

  //Laat de deletebutton zien bij de correcte reserveringen zien als 1 van de 2 waar is:
  // 1 -> Je bent admin -> Laat bij alle reserveringen deletebutton zien.
  // 2 -> Je bent de eigenaar van de reservatie -> laat de door jouw gemaakte reservaties zien.
  CheckEmailandAdmin() {
    return (
      this.state.reservations.map((data,i) =>{
        return data.email === this.props.currentUserCheck.email || this.props.currentUserCheck.admin === true?
          <tr key={data.displayName}>
            <td>{data.displayName}</td>
            <td>{this.Dates(data.firebaseDates)}</td>
            <td>{data.workplace}</td>          
            <td> <button onClick={event => this.isAuth(data.email, this.props.currentUser.email, i, this.props.currentUser.admin)} id="deleteButton">Delete</button>  </td>
          </tr>
         :
         <tr key={data.displayName}>
          <td>{data.displayName}</td>
          <td>{this.Dates(data.firebaseDates)}</td>
          <td>{data.workplace}</td>          
          <td> </td>
        </tr>
      })
    )
  }

  // HTML
  render(){
    return(
    <div>
      
      <table id='reservations'>  
      <thead>
          <tr>
            <th>Who?</th>
            <th>When?</th>
            <th>Workplace</th>
            <th>Delete button</th>
          </tr>
        </thead>
        
        <tbody>
          {this.CheckEmailandAdmin()}
        </tbody>
      </table>

        <button onClick={event =>   window.location.href = '/home'} id="backButton">Back</button>

    </div>
    )
  }
}

//Wordt gebruikt om de ingelogde persoon te krijgen
const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(yourBookingsSolo);

//<button onClick={event => this.isAuth(data.displayName, this.props.currentUser.displayName, i, this.props.currentUser.admin)} id="deleteButton">Delete</button>  delete `button 