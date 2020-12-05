import React from "react";

import "./all-booking-info.styles.scss";

const all_booking_info = () => (
  <div>
    <ul>
      <li>
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="/yourbookings">Your bookings</a>
      </li>
      <li>
        <a href="/allbookings">All bookings</a>
      </li>
      <li>
        <a href="/choosesolo">Choose solo</a>
      </li>
    </ul>
    <div className="block">
      <h1 className="block-title">#BOOKING INFO</h1>
    </div>
    <div className="back">BACK</div>
  </div>
);

export default all_booking_info;
