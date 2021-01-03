import React from 'react';

import './map.styles.scss'

export default class NgtiMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 0,
            reserved: [
                {tableNr: 1, amountOfSeats: 3, reservedSeats: 4},
                {tableNr: 2, amountOfSeats: 4, reservedSeats: 0},
                {tableNr: 3, amountOfSeats: 4, reservedSeats: 0},
                {tableNr: 4, amountOfSeats: 4, reservedSeats: 0},
                {tableNr: 5, amountOfSeats: 4, reservedSeats: 0},
                {tableNr: 6, amountOfSeats: 4, reservedSeats: 0},
                {tableNr: 7, amountOfSeats: 4, reservedSeats: 0},
                {tableNr: 8, amountOfSeats: 4, reservedSeats: 0},
                {tableNr: 9, amountOfSeats: 2, reservedSeats: 0},
                {tableNr: 10, amountOfSeats: 7, reservedSeats: 0},
                {tableNr: 11, amountOfSeats: 8, reservedSeats: 0},
                {tableNr: 12, amountOfSeats: 4, reservedSeats: 0},
                {tableNr: 13, amountOfSeats: 2, reservedSeats: 0}
            ]
        } 

    }

    setStateAndWorkplace = async (val) => {
        await this.setState({selected: val});
        this.props.workplace(this.state.selected);
    }

    render() {
        return(
            <div className="ngti-map">
                <div className="mapImg">
                    <div 
                        onClick={() => this.state.reserved[0].reservedSeats >= this.state.reserved[0].amountOfSeats ? null :  this.state.selected === 1 ? this.setStateAndWorkplace(0) : this.setStateAndWorkplace(1)} 
                        alt="1" 
                        className={`zone-to-reserve ${this.state.reserved[0].reservedSeats < this.state.reserved[0].amountOfSeats ? '' : 'reserved'} ${this.state.reserved[0].reservedSeats >= this.state.reserved[0].amountOfSeats ? null : this.state.selected === 1 ? 'selected' : ''}`}
                        >{this.state.reserved[0].reservedSeats < this.state.reserved[0].amountOfSeats ? `${this.state.reserved[0].reservedSeats}/${this.state.reserved[0].amountOfSeats} places reserved` : 'Fully Reserved'}
                    </div>
                    
                    <div 
                        onClick={() => this.state.reserved[1].reservedSeats >= this.state.reserved[1].amountOfSeats ? null : this.state.selected === 2 ? this.setStateAndWorkplace(0) : this.setStateAndWorkplace(2)} 
                        alt="2" 
                        className={`zone-to-reserve ${this.state.reserved[1].reservedSeats < this.state.reserved[1].amountOfSeats ? '' : 'reserved'} ${this.state.reserved[1].reservedSeats >= this.state.reserved[1].amountOfSeats ? null : this.state.selected === 2 ? 'selected' : ''}`} style={{top: '17%', left: '55.1%', width: '10.8%', height: '0.1%', padding: '3% 0'}}
                        >{this.state.reserved[1].reservedSeats < this.state.reserved[1].amountOfSeats ? `${this.state.reserved[1].reservedSeats}/${this.state.reserved[1].amountOfSeats} places reserved` : 'Fully Reserved'}
                    </div>
                    
                    <div 
                        onClick={() => this.state.reserved[2].reservedSeats >= this.state.reserved[2].amountOfSeats ? null : this.state.selected === 3 ? this.setStateAndWorkplace(0) : this.setStateAndWorkplace(3)} 
                        alt="3" 
                        className={`zone-to-reserve ${this.state.reserved[2].reservedSeats < this.state.reserved[2].amountOfSeats ? '' : 'reserved'} ${this.state.reserved[2].reservedSeats >= this.state.reserved[2].amountOfSeats ? null : this.state.selected === 3 ? 'selected' : ''}`} style={{top: '27.6%', left: '55.1%', width: '10.8%', height: '0.1%', padding: '3% 0'}}
                        >{this.state.reserved[2].reservedSeats < this.state.reserved[2].amountOfSeats ? `${this.state.reserved[2].reservedSeats}/${this.state.reserved[2].amountOfSeats} places reserved` : 'Fully Reserved'}
                    </div>
                    
                    <div 
                        onClick={() => this.state.reserved[3].reservedSeats >= this.state.reserved[3].amountOfSeats ? null : this.state.selected === 4 ? this.setStateAndWorkplace(0) : this.setStateAndWorkplace(4)} 
                        alt="4" 
                        className={`zone-to-reserve ${this.state.reserved[3].reservedSeats < this.state.reserved[3].amountOfSeats ? '' : 'reserved'} ${this.state.reserved[3].reservedSeats >= this.state.reserved[3].amountOfSeats ? null : this.state.selected === 4 ? 'selected' : ''}`} style={{top: '38.2%', left: '55.1%', width: '10.8%', height: '0.1%', padding: '3.1% 0'}}
                        >{this.state.reserved[3].reservedSeats < this.state.reserved[3].amountOfSeats ? `${this.state.reserved[3].reservedSeats}/${this.state.reserved[3].amountOfSeats} places reserved` : 'Fully Reserved'}
                    </div>
                    
                    <div 
                        onClick={() => this.state.reserved[4].reservedSeats >= this.state.reserved[4].amountOfSeats ? null : this.state.selected === 5 ? this.setStateAndWorkplace(0) : this.setStateAndWorkplace(5)}
                        alt="5" 
                        className={`zone-to-reserve ${this.state.reserved[4].reservedSeats < this.state.reserved[4].amountOfSeats ? '' : 'reserved'} ${this.state.reserved[4].reservedSeats >= this.state.reserved[4].amountOfSeats ? null : this.state.selected === 5 ? 'selected' : ''}`} style={{top: '49.2%', left: '55.1%', width: '10.8%', height: '0.1%', padding: '3% 0'}}
                        >{this.state.reserved[4].reservedSeats < this.state.reserved[4].amountOfSeats ? `${this.state.reserved[4].reservedSeats}/${this.state.reserved[4].amountOfSeats} places reserved` : 'Fully Reserved'}
                    </div>
                    
                    <div 
                        onClick={() => this.state.reserved[5].reservedSeats >= this.state.reserved[5].amountOfSeats ? null : this.state.selected === 6 ? this.setStateAndWorkplace(0) : this.setStateAndWorkplace(6)} 
                        alt="6" 
                        className={`zone-to-reserve ${this.state.reserved[5].reservedSeats < this.state.reserved[5].amountOfSeats ? '' : 'reserved'} ${this.state.reserved[5].reservedSeats >= this.state.reserved[5].amountOfSeats ? null : this.state.selected === 6 ? 'selected' : ''}`} style={{top: '59.8%', left: '55.1%', width: '10.8%', height: '0.1%', padding: '3.1% 0'}}
                        >{this.state.reserved[5].reservedSeats < this.state.reserved[5].amountOfSeats ? `${this.state.reserved[5].reservedSeats}/${this.state.reserved[5].amountOfSeats} places reserved` : 'Fully Reserved'}
                    </div>
                    
                    <div 
                        onClick={() => this.state.reserved[6].reservedSeats >= this.state.reserved[6].amountOfSeats ? null : this.state.selected === 7 ? this.setStateAndWorkplace(0) : this.setStateAndWorkplace(7)} 
                        alt="7" 
                        className={`zone-to-reserve ${this.state.reserved[6].reservedSeats < this.state.reserved[6].amountOfSeats ? '' : 'reserved'} ${this.state.reserved[6].reservedSeats >= this.state.reserved[6].amountOfSeats ? null : this.state.selected === 7 ? 'selected' : ''}`} style={{top: '75.8%', left: '62.8%', width: '7%', height: '1.5%', padding: '4% 0'}}
                        >{this.state.reserved[6].reservedSeats < this.state.reserved[6].amountOfSeats ? `${this.state.reserved[6].reservedSeats}/${this.state.reserved[6].amountOfSeats} places reserved` : 'Fully Reserved'}
                    </div>
                    
                    <div 
                        onClick={() => this.state.reserved[7].reservedSeats >= this.state.reserved[7].amountOfSeats ? null : this.state.selected === 8 ? this.setStateAndWorkplace(0) : this.setStateAndWorkplace(8)} 
                        alt="8" 
                        className={`zone-to-reserve ${this.state.reserved[7].reservedSeats < this.state.reserved[7].amountOfSeats ? '' : 'reserved'} ${this.state.reserved[7].reservedSeats >= this.state.reserved[7].amountOfSeats ? null : this.state.selected === 8 ? 'selected' : ''}`} style={{top: '75.8%', left: '69.8%', width: '6.75%', height: '1.5%', padding: '4% 0'}}
                        >{this.state.reserved[7].reservedSeats < this.state.reserved[7].amountOfSeats ? `${this.state.reserved[7].reservedSeats}/${this.state.reserved[7].amountOfSeats} places reserved` : 'Fully Reserved'}
                    </div>

                    <div 
                        onClick={() => this.state.reserved[8].reservedSeats >= this.state.reserved[8].amountOfSeats ? null : this.state.selected === 9 ? this.setStateAndWorkplace(0) : this.setStateAndWorkplace(9)} 
                        alt="9" 
                        className={`zone-to-reserve ${this.state.reserved[8].reservedSeats < this.state.reserved[8].amountOfSeats ? '' : 'reserved'} ${this.state.reserved[8].reservedSeats >= this.state.reserved[8].amountOfSeats ? null : this.state.selected === 9 ? 'selected' : ''}`} style={{top: '75.8%', left: '76.55%', width: '8.79%', height: '1.5%', padding: '4% 0'}}
                        >{this.state.reserved[8].reservedSeats < this.state.reserved[8].amountOfSeats ? `${this.state.reserved[8].reservedSeats}/${this.state.reserved[8].amountOfSeats} places reserved` : 'Fully Reserved'}
                    </div>
                    
                    <div 
                        onClick={() => this.state.reserved[9].reservedSeats >= this.state.reserved[9].amountOfSeats ? null : this.state.selected === 10 ? this.setStateAndWorkplace(0) : this.setStateAndWorkplace(10)}
                        alt="10" 
                        className={`zone-to-reserve ${this.state.reserved[9].reservedSeats < this.state.reserved[9].amountOfSeats ? '' : 'reserved'} ${this.state.reserved[9].reservedSeats >= this.state.reserved[9].amountOfSeats ? null : this.state.selected === 10 ? 'selected' : ''}`} style={{top: '17%', left: '73%', width: '6.15%', height: '0.7%', padding: '3% 0'}}
                        >{this.state.reserved[9].reservedSeats < this.state.reserved[9].amountOfSeats ? `${this.state.reserved[9].reservedSeats}/${this.state.reserved[9].amountOfSeats} places reserved` : 'Fully Reserved'}
                    </div>
                    
                    <div 
                        onClick={() => this.state.reserved[10].reservedSeats >= this.state.reserved[10].amountOfSeats ? null : this.state.selected === 11 ? this.setStateAndWorkplace(0) : this.setStateAndWorkplace(11)}
                        alt="11" 
                        className={`zone-to-reserve ${this.state.reserved[10].reservedSeats < this.state.reserved[10].amountOfSeats ? '' : 'reserved'} ${this.state.reserved[10].reservedSeats >= this.state.reserved[10].amountOfSeats ? null : this.state.selected === 11 ? 'selected' : ''}`} style={{top: '17%', left: '83.1%', width: '12.2%', height: '0.7%', padding: '3% 0'}}
                        >{this.state.reserved[10].reservedSeats < this.state.reserved[10].amountOfSeats ? `${this.state.reserved[10].reservedSeats}/${this.state.reserved[10].amountOfSeats} places reserved` : 'Fully Reserved'}
                    </div>
                    
                    <div 
                        onClick={() => this.state.reserved[11].reservedSeats >= this.state.reserved[11].amountOfSeats ? null : this.state.selected === 12 ? this.setStateAndWorkplace(0) : this.setStateAndWorkplace(12)} 
                        alt="12"
                        className={`zone-to-reserve ${this.state.reserved[11].reservedSeats < this.state.reserved[11].amountOfSeats ? '' : 'reserved'} ${this.state.reserved[11].reservedSeats >= this.state.reserved[11].amountOfSeats ? null : this.state.selected === 12 ? 'selected' : ''}`} style={{top: '43.5%', left: '69.7%', width: '9.5%', height: '0.9%', padding: '3.5% 0'}}
                        >{this.state.reserved[11].reservedSeats < this.state.reserved[11].amountOfSeats ? `${this.state.reserved[11].reservedSeats}/${this.state.reserved[11].amountOfSeats} places reserved` : 'Fully Reserved'}
                    </div>
                    
                    <div 
                        onClick={() => this.state.reserved[12].reservedSeats >= this.state.reserved[12].amountOfSeats ? null : this.state.selected === 13 ? this.setStateAndWorkplace(0) : this.setStateAndWorkplace(13)} 
                        alt="13" 
                        className={`zone-to-reserve ${this.state.reserved[12].reservedSeats < this.state.reserved[12].amountOfSeats ? '' : 'reserved'} ${this.state.reserved[12].reservedSeats >= this.state.reserved[12].amountOfSeats ? null : this.state.selected === 13 ? 'selected' : ''}`} style={{top: '45%', left: '83.1%', width: '6.85%', height: '4%', padding: '1.75% 0'}}
                        >{this.state.reserved[12].reservedSeats < this.state.reserved[12].amountOfSeats ? `${this.state.reserved[12].reservedSeats}/${this.state.reserved[12].amountOfSeats} places reserved` : 'Fully Reserved'}
                    </div>

                </div>
            </div>
        );
    }
}