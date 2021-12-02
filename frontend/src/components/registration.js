import React, { Component } from 'react';


class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password1: "",
            password2: "",
        };
        this.url = props.url;

        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword1 = this.handlePassword1.bind(this);
        this.handlePassword2 = this.handlePassword2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsername(e) {
        this.setState({username: event.target.value});
    }

    handleEmail(e) {
        this.setState({email: event.target.value});
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

        const data = {
            username: this.state.username,
            email: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2,
        };
        console.log(data);

        fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }

    render() {
        return (
            <form className='login-form' onSubmit={this.handleSubmit}>
                <FormInput
                    label="Username:"
                    type="text"
                    content={this.state.username}
                    onChange={this.handleUsername}
                />
                <FormInput
                    label="Email:"
                    type="text"
                    content={this.state.email}
                    onChange={this.handleEmail}
                />
                <FormInput
                    label="Password:"
                    type="password"
                    content={this.state.password1}
                    onChange={this.handlePassword1}
                />
                <FormInput
                    label="Repeat Password:"
                    type="password"
                    content={this.state.password2}
                    onChange={this.handlePassword2}
                />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

const FormInput = (props) => {
    return (
        <label className="form-input">
            {props.label}
            <input type={props.type} value={props.content} onChange={props.onChange}/>
        </label>
    )
}

export {RegistrationForm};
