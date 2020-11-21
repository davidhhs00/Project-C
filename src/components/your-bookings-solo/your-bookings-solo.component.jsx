import React from "react";

import './your-bookings-solo.styles.scss';


  const yourBookingsSolo = () => 
    <div>
      <div    id='box1'>
          <h1 className='title1'>Your reservation on #day #date</h1>
          <h2 className='info1'>#time  #location</h2>
        </div>

        <div    id='box1'>
          <h1 className='title2'>Your reservation on #day #date</h1>
          <h2 className='info2'>#time  #location</h2>
        </div>

        <div    id='box1'>
          <h1 className='title3'>Your reservation on #day #date</h1>
          <h2 className='info3'>#time  #location</h2>
        </div>


        <button onClick={event =>  window.location.href='/home'} id="backButton">Back</button>

    </div>
export default yourBookingsSolo;
