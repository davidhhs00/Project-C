import React from "react";
import { getAllUsers, createNewDocument } from "../../firebase/firebase.utils";
import "./addbhv.styles.scss";

export default class AddBhv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      personID: "",
      title: "BHV",
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
    createNewDocument(this.state.personID, this.state.title);
  }

  render() {
    return (
      <div className="bhv-page">
        <form>
          <label htmlFor="people">Appoint new BHV: </label>
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
          <button className="submit-btn" onClick={this.addBHV} type="submit">
            Add new BHV
          </button>
        </form>
      </div>
    );
  }
}
