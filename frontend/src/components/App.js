import React, { Component } from 'react';
import { render } from "react-dom";
import { RegistrationForm, LoginForm } from './registration.js';
import { RadioForm } from './form.js';

const Registration = (props) => {
    if (props.role === 'Customer') {
        return <RegistrationForm
            url="/api/registration/customer/"
            onLogin={props.onLogin}
        />
    } else if (props.role === 'Courier') {
        return <RegistrationForm
            url="/api/registration/courier/"
            onLogin={props.onLogin}
        />
    } else {
        return <h1> Unknown role</h1>
    }
}

const Login = (props) => {
    return <LoginForm url="/api/login/" onLogin={props.onLogin}/>
}

class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 'ChooseRole',
            auth: 'Register',
            role: 'Customer',
        }
        this.props = props;

        this.handleRoleChoice = this.handleRoleChoice.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleAuthChoice = this.handleAuthChoice.bind(this);
        this.handleAuthChange = this.handleAuthChange.bind(this);

        this.onLogin = this.onLogin.bind(this);
    }

    handleRoleChange(e) {
        this.setState({role: e.target.value});
    }

    handleRoleChoice(e) {
        e.preventDefault();
        this.setState({step: 'ChooseAuth'});
    }

    choose_role() {
        let choices = [
            ["Customer", "As a Customer"],
            ["Courier", "As a Courier"],
        ];
        return <RadioForm
            header="How do you want to use this site?"
            choices={choices}
            onChange={this.handleRoleChange}
            onSubmit={this.handleRoleChoice}
            submit="Next"
        />
    }

    handleAuthChange(e) {
        this.setState({auth: e.target.value});
    }

    handleAuthChoice(e) {
        e.preventDefault();
        this.setState({step: 'Auth'});
    }

    choose_auth() {
        let choices = [
            ["Register", "No. Sign me up!"],
            ["Login", "Yes. Log-In"],
        ];
        return <RadioForm
            header="Welcome. Do you already have an account?"
            choices={choices}
            onChange={this.handleAuthChange}
            onSubmit={this.handleAuthChoice}
            submit="Next"
        />
    }

    onLogin(auth_key) {
        let data = {
            role: this.state.role,
            auth_key: auth_key, 
        };
        this.props.onLogin(data);
    }

    auth() {
        if (this.state.auth === 'Register') {
            return this.register()
        } else if (this.state.auth === 'Login') {
            return this.login()
        } else {
            return <h1> Something went wrong </h1>
        }
    }

    register() {
        return <Registration role={this.state.role} onLogin={this.onLogin}/>
    }

    login() {
        return <Login onLogin={this.onLogin}/>
    }

    render() {
        if (this.state.step === 'ChooseRole') {
            return this.choose_role()
        } else if (this.state.step === 'ChooseAuth') {
            return this.choose_auth()
        } else if (this.state.step === 'Auth') {
            return this.auth()
        } else {
            return <h1>Something went wrong</h1>
        }
    }
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: 'Customer',
            step: 'Auth',
        };

        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(data) {
        let {role, auth_key} = data;
        console.log(data);
        this.setState({step: 'Main'})
    }

    render() {
        if (this.state.step === 'Auth') {
            return <WelcomePage onLogin={this.onLogin}/>
        } else {
            return <h1> Not implemented </h1>
        }
    }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
