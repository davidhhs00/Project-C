import React from 'react';

import './map.styles.scss'

import map from '../../assets/NGTI MAP.PNG';

class ngtiMap extends React.Component {
    constructor() {
        super();

        this.state = {

        } 
    }

    render() {
        return(
            <div className="ngti-map">
                <img className="mapImg" src={map} alt="ngti-map"/>
                <div className="zone-to-reserve"></div>
            </div>
        );
    }
}

export default ngtiMap;