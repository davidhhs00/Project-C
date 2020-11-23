import { app } from "firebase";
import React from "react";

import './your-bookings-solo.styles.scss';


  const yourBookingsSolo = () => 
    <div>
      
      <table id='reservations'>  
        <tr>
          <th>datum</th>
          <th>Werkplek</th>  
          <th>Team</th>
          <th>Met wie zit ik?</th>
          <th>Tijdvak</th>
        </tr>

        <tr>
          <td>24-11-2020</td>
          <td>Tafel 3</td>
          <td>Team 2</td>
          <td>David v/d Heuvel</td>
          <td>Ochtend</td>
        </tr>

        <tr>
          <td>24-11-2020</td>
          <td>Tafel 3</td>
          <td>Team 2</td>
          <td>David v/d Heuvel</td>
          <td>Ochtend</td>
        </tr>

        <tr>
          <td>24-11-2020</td>
          <td>Tafel 3</td>
          <td>Team 2</td>
          <td>David v/d Heuvel</td>
          <td>Ochtend</td>
        </tr>

        <tr>
          <td>24-11-2020</td>
          <td>Tafel 3</td>
          <td>Team 2</td>
          <td>David v/d Heuvel</td>
          <td>Ochtend</td>
        </tr>

      </table>

        <button onClick={event =>  window.location.href='/home'} id="backButton">Back</button>

    </div>
export default yourBookingsSolo;
