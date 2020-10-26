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