import React from 'react';
import { connect } from 'react-redux';

import '../../firebase/firebase.utils';
import { createNotification, getAllUsers } from '../../firebase/firebase.utils';

import AddBHV from '../addBHV/add-bhv.component'

import './admin-page.styles.scss';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            people: [],
            answer1: "",
            answer2: "",
            message: "",
            title: "",
            receiverID: ""
        }
        this.createNotification = this.createNotification.bind(this);
    }

    componentDidMount() {
        getAllUsers().then(results => this.setState({
            people: results,
            receiverID: results[0].id,
        }))
    }

    createNotification(e) {
        e.preventDefault();
        let notification = {
            title: this.state.title,
            message: this.state.message,
            answer1: this.state.answer1,
            answer2: this.state.answer2
        }
        console.log(this.props.currentUser.id, this.state.receiverID, notification)
        createNotification(this.props.currentUser.id, this.state.receiverID, notification)
    }

    render() {
        return (
            <div className="admin-page">
                <div className="admin-left">
                    <h1>Welcome to admin Dashboard</h1>
                    <h2>Send notification to a user</h2>
                
                    <form method="set" autoComplete="off">
                        <label htmlFor="people">Choose Person: </label>
                        <select onChange={(e) => this.setState({receiverID: e.target.value })} name="people">
                            { this.state.people.map(person => <option key={person.id} value={person.id}>{person.displayName}</option>) }
                        </select> 
                        <br></br>
                        <label htmlFor="Title">Notification Title: </label>
                        <input onChange={(e) => this.setState({title: e.target.value})} name="Title" placeholder="Enter title here..."></input>
                        <br></br>
                        <label htmlFor="Message">Notification Message: </label>
                        <input onChange={(e) => this.setState({message: e.target.value})} name="Message" placeholder="Enter message here..."></input>
                        <br></br>
                        <label htmlFor="Answer1">1st Notification Answer: </label>
                        <input onChange={(e) => this.setState({answer1: e.target.value})} name="Answer1" placeholder="Enter Answer here..."></input>
                        <br></br>
                        <label htmlFor="Answer2">2st Notification Answer: </label>
                        <input onChange={(e) => this.setState({answer2: e.target.value})} name="Answer2" placeholder="Enter Answer here..."></input>
                        <br></br>
                        <button onClick={this.createNotification} type="submit">CREATE NOTIFICATION</button><br/>
                    </form>
                    <button onClick={(event) => (window.location.href = "/home")}> Home </button>
                </div>

                <div className="admin-right">
                    <AddBHV/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(AdminPage);