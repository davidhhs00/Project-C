import React from 'react'

const verifyState = (props) => {
    let check = false;
    if(props.workplace !== "" && Object.keys(props.dates).length !== 0){
        check = true;
        }
    return check;
}


export default verifyState;
    