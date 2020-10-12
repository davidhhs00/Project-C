import React from 'react';
import './homepage.styles.scss'

const MainPage = () => (
    <body>
        <div>
            <img src="../images/logo.png" className="login-image"></img>
            <h1 className="welcome">WELCOME, <br />#YOUR_NAME</h1>
            <h2 className="welcome">Book a workplace for: </h2>
        </div>
        <div>
            <button className="buttons">Yourself</button>
            <br />
            <button className="buttons">Group</button>
            <button className="logout">Logout</button>
        </div>
    </body>
)

export default MainPage;