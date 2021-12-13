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
        const choices = [
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
        const choices = [
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
        const data = {
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

const Frame = (props) => {
    return (
        <div>
            {props.children}
            <button onClick={props.resetAction}>
                Reset Data (used for testing)
            </button>
        </div>
    )
}


class App extends Component {
    constructor(props) {
        super(props);
        const role = window.localStorage.getItem("role") ?? null;
        const auth_key = window.localStorage.getItem("auth_key") ?? null;
        this.state = {
            role: role,
            auth_key: auth_key,
            next_step: 'Main',
        };

        this.onLogin = this.onLogin.bind(this);
        this.resetData = this.resetData.bind(this);
    }

    resetData() {
        this.setState({role: null, auth_key: null, next_step: 'Auth'})
        window.localStorage.removeItem("role")
        window.localStorage.removeItem("auth_key")
    }

    onLogin(data) {
        const {role, auth_key} = data;
        console.log(data);
        window.localStorage.setItem("auth_key", auth_key);
        window.localStorage.setItem("role", role);
        this.setState({role: role, auth_key: auth_key, next_step: 'Main'})
    }

    findStep() {
        const needLogin = (state) => {
            const need_key = state.auth_key === null;
            const need_role = state.role === null;
            return state.next_step === 'Main' && (need_role || need_key)
        };

        if (needLogin(this.state)) {
            return 'Auth'
        } else {
            return this.state.next_step;
        }
    }

    render() {
        const step = this.findStep();
        if (step === 'Auth') {
            return (
                <Frame resetAction={this.resetData}>
                    <WelcomePage onLogin={this.onLogin}/>
                </Frame>
            )
        } else {
            return (
                <Frame resetAction={this.resetData}>
                    <h1> Not implemented </h1>
                </Frame>
            )
        }
    }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
