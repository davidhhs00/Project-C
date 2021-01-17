import React from "react";
import { getAllUsers, createNewDocument } from "../../firebase/firebase.utils";
import "./addbhv.styles.scss";

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] 

export default class AddBhv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      personID: "",
      title: "BHV",
      days: [],
      amountDays: null
    };
    this.addBHV = this.addBHV.bind(this);
  }

  componentDidMount() {
    getAllUsers().then((persons) =>
      this.setState({
        people: persons,
      })
    );
  }

  addBHV(e) {
    e.preventDefault();
    createNewDocument(this.state.personID, this.state.title, this.state.days);
  }

  amountOfDays = (e) => {
    if(e.target.value > 0 && e.target.value <6){
      this.setState({amountDays : e.target.value})
    } else if(e.target.value == 0 || e.target.value > 5){
      this.setState({amountDays : null})
    }
  }
  setDays = (e, i) => {
    e.persist()
    this.setState(prevState => {
      const {days} = prevState;
        if(!days.includes(e.target.value)){
           days.push(e.target.value);
        }
        return days
      }
    )
  }

  render() {
    return (
      <div className="bhv-page">
        <form>
          <label htmlFor="people">Appoint new BHV:</label>
          <br />
          <select className="input-btn"
            onChange={(e) => this.setState({ personID: e.target.value })}
            name="people"
          >
            <option key="default" value="">
              Select a user
            </option>
            {this.state.people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.displayName}
              </option>
            ))}
          </select>
          <br />
          <label>Enter amount of days: </label>
          <input className="input-btn" type='number' onChange={this.amountOfDays}></input>
          <br />
          <label>Select which days of the week:</label>
          {(this.state.amountDays ? weekdays : []).map((key, i) => (
              (i < this.state.amountDays ? <div key={i}>
                    <select className="input-btn" type="select"key={i} onChange={this.setDays}>
                      <option key="default" value="">Select an option</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                    </select>
                  </div> : "")
          ))}
          <br />
          <button className="submit-btn" onClick={this.addBHV} type="submit">
            Add new BHV
          </button>
        </form>
      </div>
    );
  }
}
