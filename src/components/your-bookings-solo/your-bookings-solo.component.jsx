// Import van firebase, styling en react
import { connect } from 'react-redux';
import React from "react";
import { firestore } from '../../firebase/firebase.utils'
import * as firebase from 'firebase';
import './your-bookings-solo.styles.scss';


class yourBookingsSolo extends React.Component{
  //constructor die de props en de reservations en documentid arrays initialized
  constructor(props) {
    
    super(props);

    this.state = {
      reservations : [],
      documentid : [],
      }
    }
  
  //Deze functie haalt reservatie data en de documentID uit de firebase
  componentDidMount(){
      //Reservatie data gaat naar het reservations array
      //documentid gaat naar het documentid array
      firestore.collection('reservations')
        .get()
        .then( snapshot => {
          let reservations = [];
          let documentid = [];
          //onderstaande lines pushen voor elke reservatie de reservatie data (data) naar het reservations array en het documentid (docID) naar het documentid array
          snapshot.forEach( doc => {
            const data = doc.data()
            const docID = doc.id
            reservations.push(data)
            documentid.push(docID)
          })
          this.setState({ reservations: reservations })
          this.setState({ documentid: documentid })
        })
        .catch(error => console.log(error))
  }
  
  //Verwijdert de correcte reservering uit de database. en refresht de pagina na 500ms
  //i == het nummer van jouw reservatie in de tabel
  removeToCollection(i) {
    // fetched het documentID door het nummer van de reservatie in de tabel te pakken en die id uit het documentid array te pakken
    let key = this.state.documentid[i]
    //stuurt de command naar firebase om de reservatie te verwijderen, naar aanleiding van de key die hiervoor gefetched is
    firebase.firestore().collection("reservations").doc(key).delete()
    //reload de pagina na 500ms, dit moet met een delay omdat anders de firebase geen command krijgt om de reservatie te verwijderen. 500ms is gekozen omdat het niet te lang is en wel goed werkt
    setTimeout(function(){window.location.reload(true);}, 500)
  }

  // Bijbehorende functie van CheckEmailandAdmin()
  // Checkt of je email hetzelfde is en of je admin bent
  // x == data.email == de email van de gebruiker die in de reservatie staat 
  //y == this.props.currentUser.email == de email van de gebruiker die op het moment ingelogd is
  //z == i == het nummer van jouw reservatie in de tabel
  //a == this.props.currentUser.admin == admin check
  isAuth(x, y, z, a){
    //als allebei de emails gelijk zijn dan wordt de reservatie verwijderd
    if (x === y){
      this.removeToCollection(z)
    }
    //als de gebruiker die nu is ingelogd een admin is dan wordt de reservatie verwijderd
    if (a){
      this.removeToCollection(z)
    }
    //als geen van beide waar is en de gebruiker kan toch op de delete knop klikken dan krijgt hij een alert. deze situatie kan in principe niet voorkomen.
    else if(x !== y && !a) {
      alert('dit kan niet')
    }
  }

  //zorgt dat er een komma en een spatie tussen de reservaties komt en dat de workplace wordt weergeven.
  //x = data.firebaseDates
  Dates(x){
    var text = ""
    //for loop die door alle dates in de data.firebaseDates heen loopt en de komma en spatie plaatst
      for(let i = 0; i < x.length; i++){
        if(i < x.length-1){
          text += x[i].Date + " Workplace: " + x[i].Workplace + ", "
        }
        //bij de laatste date in de data.firebaseDates plaatst hij geen komma en spatie aan het einde
        else{
          text += x[i].Date + " Workplace: " + x[i].Workplace
        }
      }
      return(text)
  }


  CheckEmailandAdmin() {
    return (
      this.state.reservations.map((data,i) =>{
        return data.email === this.props.currentUserCheck.email || this.props.currentUserCheck.admin === true?
          //Laat de delete button zien bij de correcte reserveringen als 1 van de 3 waar is:
          // 1 -> Je bent admin -> Laat bij alle reserveringen delete button zien.
          // 2 -> Je bent de eigenaar van de reservatie -> laat bij de door jouw gemaakte reservaties de delete knop zien.
          <tr key={data.groupName ? [data.groupName,data.email,data.colleague1,data.colleague2,data.colleague3,data.colleague4] : data.email}>
            <td>{data.displayName}</td>
            <td>{this.Dates(data.firebaseDates)}</td>         
            <td> <button onClick={event => this.isAuth(data.email, this.props.currentUser.email, i, this.props.currentUser.admin)} id="deleteButton">Delete</button>  </td>
          </tr>
         :
         // 3 -> je bent geen van beide -> laat geen delete knop zien. wel iedereen zijn reservaties, inclusief groepsreservaties
         <tr key={data.groupName ? [data.groupName,data.email,data.colleague1,data.colleague2,data.colleague3,data.colleague4] : data.email}>
          <td>{data.displayName}</td>
          <td>{this.Dates(data.firebaseDates)}</td>         
          <td> </td>
        </tr>
      })
    )
  }

  // HTML rendert de tabel en voert de CheckEmailandAdmin functie uit, rendert ook de terug knop
  render(){
    return(
    <div>
      
      <table id='reservations'>  
      <thead>
          <tr>
            <th>Who?</th>
            <th>When?</th>
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

//Wordt gebruikt om de informatie over de ingelogde persoon te krijgen
const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(yourBookingsSolo);