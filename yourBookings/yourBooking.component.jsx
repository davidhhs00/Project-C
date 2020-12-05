<<<<<<< Updated upstream:yourBookings/yourBooking.component.jsx
import React from "react";

import './yourBooking.styles.scss';

const yourBooking = () => (
        <div>
            <h1 className="topText"> Your Bookings:</h1>

            <button id="backButton">Back</button>
            <button id="bookingX">Booking #X</button>
            <button id="bookingY">Booking #Y</button>
            <button id="bookingZ">Booking #Z</button>
        </div>
)

export default yourBooking;
=======
import React, { useState } from "react";
import Popup from './popup'


import './your-bookings-solo.styles.scss';


  function App() {
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }
        return(
        <div className = 'app'>
            <h1 className="topText"> Your Bookings:</h1>

            <button onClick={event =>  window.location.href='/home'} id = 'backButton'>Back</button>
            
            
            <button onClick={togglePopup    } id="bookingX">Booking #X</button>   
            {isOpen && <Popup
                content={<>
                <b>Design your Popup</b>
                <p>ALS(!) je dit ziet dan werkt popup 1</p>
                </>}
            handleClose={togglePopup}
            />}


            <button onClick={togglePopup} id="bookingY">Booking #Y</button>
            {isOpen && <Popup
                content={<>
                <b>Design your Popup</b>
                <p>ALS(!) je dit ziet dan werkt popup 2</p>
                </>}
            handleClose={togglePopup}
            />}


            <button onClick={togglePopup} id="bookingZ">Booking #Z</button>
            {isOpen && <Popup
                content={<>
                <b>Design your Popup</b>
                <p>ALS(!) je dit ziet dan werkt popup 3</p>
                </>}
            handleClose={togglePopup}
            />}           
            
        </div>
        )
    }

export default App;
>>>>>>> Stashed changes:src/components/your-bookings-solo/your-bookings-solo.component.jsx
