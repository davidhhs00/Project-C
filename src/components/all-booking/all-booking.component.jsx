import React from "react";

import "./all-booking.styles.scss";

const all_booking = () => (
  <div className="main">
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
    <div className="search">SEARCH BY</div>
    <h1 className="title">Bookings</h1>
    <div className="button">#BOOKING 1</div>
    <div className="button">#BOOKING 2</div>
    <div className="button">#BOOKING 3</div>
    <div className="button">#BOOKING 4</div>
    <div className="back">BACK</div>
  </div>
);

export default all_booking;
