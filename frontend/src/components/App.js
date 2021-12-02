import React, { Component } from 'react';
import { render } from "react-dom";
import { RegistrationForm } from './registration.js';

const Registration = (props) => {
    if (props.role === 'Customer') {
        return <RegistrationForm url="/api/registration/customer/"/>
    } else if (props.role === 'Courier') {
        return <RegistrationForm url="/api/registration/courier/"/>
    } else {
        return <div>Unknown role</div>
    }
}

const Welcome = (props) => {
    return (
        <div>
            <h1> Welcome! </h1>
            <Registration role={props.role}/>
        </div>
    )
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: 'Customer',
        };
    }


    render() {
        return <Welcome role={this.state.role}/>
    }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
