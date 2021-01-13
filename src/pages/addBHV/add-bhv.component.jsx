import React from 'react';
import { getAllUsers, createNewDocument} from '../../firebase/firebase.utils';



export default class AddBhv extends React.Component {

    constructor(props) {
        super(props);
    this.state = {
        people: [],
        personID: '',
        title: 'BHV'
        }     
        this.addBHV = this.addBHV.bind(this)
    }

    componentDidMount() {
        getAllUsers().then(persons => this.setState({
            people: persons
        }));
    }
    
    addBHV(e){
        e.preventDefault();
        createNewDocument(this.state.personID, this.state.title)
        
    }

    render(){
        return(
            <div>
            <h2>Appoint a new BHV</h2>
            <form>
                <label htmlFor="people">Appoint new BHV: </label>
                <br />
                <select onChange={(e) => this.setState({personID: e.target.value})} name="people">
                    { this.state.people.map(person => <option key={person.id} value={person.id}>{person.displayName}</option>) }
                </select>
                <br />
                <button onClick={this.addBHV} type="submit">Add new BHV</button>
            </form>
            </div>
        )
    }

}