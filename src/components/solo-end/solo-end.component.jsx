import React from "react";
import backgroundImg from "../../assets/soloEndBackground.jpeg"
import './soloEndPage.styles.scss';

const soloEndPage = () => (
        <div>
            <img src={backgroundImg} className="BackgroundImage" alt="Img of office"></img>
            <h1 className="workplaceBooked"> Your workplace has been booked!</h1>
            <h2 className="workplaceInfo">
                Workplace:<br /> #Workplace_Designator <br /><br />
                From:<br /> #Start_Date <br /><br />
                Till:<br /> #End_Date
            </h2>
            <h3 className="backText"> Tap anywhere to go back </h3>

            <button id="back-button"></button>
        </div>
)

export default soloEndPage;