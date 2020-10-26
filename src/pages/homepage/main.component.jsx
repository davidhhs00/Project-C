import React, { Fragment } from 'react'
import img from '../../images/image2.0.svg'
import { DateRangePicker} from 'react-dates'
import './homepage.styles.scss'

// Solo mainpage


class MainSolo extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            workplace: null,
            startDate: null,
            endDate: null,
            timeslot: "",
            booked: false
        }
    
        // this.handleChange = this.handleChange.bind(this)
        this.buttonSelected = this.buttonSelected.bind(this)
        this.confirm = this.confirm.bind(this)
    
    }

    buttonSelected = tt => e=> {
        this.setState({ timeslot: tt}, () => {
            // console.log(this.state.timeslot)
        })
    }

    confirm = bool => e => {
        this.setState({booked: bool}, () => {
            // console.log(this.state.booked)
        })
    }

    
    render() {
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <img src={img} className="img"></img>
                    <h2 className="welcome">Select Workplace:</h2>
                    <input className="buttons" name="workplace" type="text" value={this.state.workplace}/>
                    <h2 className="welcome">Select dates:</h2>
                    <br />
                    <h2 className="welcome">Choose Timeslot:</h2>
                    {["MORNING", "AFTERNOON", "EVENING"].map(key => 
                    <button className="timeslot" type="button" key={key} onClick={this.buttonSelected(key)}>{key}</button>)}

                    {/* <div style=""> */} 
                        {/* <button className="Morning" type="button" onClick={this.buttonSelected("Morning")}>MORNING</button>
                        <button className="Afternoon" type="button" onClick={this.buttonSelected("Afternoon")}>AFTERNOON</button>
                        <button className="Evening" type="button" onClick={this.buttonSelected("Evening")}>EVENING</button> */}
                     {/* </div> */}
                    <button className="submitBtn" type="button" onClick={this.confirm(true)}>Book</button>
                    <button className="backBtn" type="button" value="True">Back</button>
                </form>
            </Fragment>
        )
        
    }
    
}

export default MainSolo;