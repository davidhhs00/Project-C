import React from 'react';
import './displaymsg.styles.scss';


export default class Message extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            style: "off",
            bool: null
        }
        this.timeout = null;
        this.showMessage = this.showMessage.bind(this);
    }

    onShow = (msg) => {
        if(this.timeout){
            clearTimeout(this.timeout);
            this.setState({style: "off"}, () => {
                this.timeout = setTimeout(() => {
                    this.showMessage(msg);
                }, 500);
            })
        } else {
            this.showMessage(msg);
        }
    }

    showMessage = (msg) => {
        this.setState(prevState => ({
            style: "on",
            msg: msg,
            bool: !prevState
        }), () => {
            this.timeout = setTimeout(() => {
                this.setState({
                    style: "off"
                });
            }, 3000);
        });
    }
    render(){
        if(!this.bool){
            this.showMessage("hello")
        }
        return(
            <div className={this.state.style}>Hello</div>
        );
    }
}

