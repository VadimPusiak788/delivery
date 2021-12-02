import React, { Component } from 'react';
import { render } from "react-dom";


class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password1: "",
            password2: "",
            city: "",
            password: "",
        };

        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword1 = this.handlePassword1.bind(this);
        this.handlePassword2 = this.handlePassword2.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsername(e) {
        this.setState({username: event.target.value});
    }

    handleEmail(e) {
        this.setState({email: event.target.value});
    }

    handleCity(e) {
        this.setState({city: event.target.value});
    }

    handlePassword1(e) {
        this.setState({password1: event.target.value});
    }

    handlePassword2(e) {
        this.setState({password2: event.target.value});
    }

    handlePassword(e) {
        this.setState({password: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.state;
        console.log(data);
        const url = '/api/registration/courier/';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(r => console.log(r))
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input type="text"
                        value={this.state.username}
                        onChange={this.handleUsername}
                    />
                </label>
                <label>
                    City:
                    <input type="text"
                        value={this.state.city}
                        onChange={this.handleCity}
                    />
                </label>
                <label>
                    Email:
                    <input type="text"
                        value={this.state.email}
                        onChange={this.handleEmail}
                    />
                </label>
                <label>
                    Password:
                    <input type="password"
                        value={this.state.password1}
                        onChange={this.handlePassword1}
                    />
                </label>
                <label>
                    Repeat Password:
                    <input type="password"
                        value={this.state.password2}
                        onChange={this.handlePassword2}
                    />
                </label>
                <label>
                    Final Password, I swear:
                    <input type="password"
                        value={this.state.password}
                        onChange={this.handlePassword}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

function Welcome(props) {
    return (
        <div>
            <h1> Welcome! </h1>
            <RegistrationForm/>
        </div>
    )
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
    }


    render() {
        return <Welcome/>
    }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
