import React from "react";
import backgroundImg from "../../images/soloEndBackground.jpeg"
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

            <button id="back-button"></button>
        </div>
)

export default soloEndPage;