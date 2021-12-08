import React, { Component } from 'react';

const Form = (props) => {
    return (
        <div>
            <h1>{props.header}</h1>
            <form className={props.className} onSubmit={props.onSubmit}>
                {props.children}
                <input type="submit" value={props.submit}/>
            </form>
        </div>
    )
}

class RadioForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
        }
        this.props = props;

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({checked: e.target.value});
        this.props.onChange(e);
    }

    render() {
        const choices = this.props.choices.map((req) => {
            let [choice, desc] = req;
            let res = (
                <label key={choice}>
                    {desc}
                    <input type="radio"
                        value={choice}
                        onChange={this.handleChange}
                        checked={this.state.checked === choice}
                    />
                </label>
            );
            return res;
        });
        const className = (this.props.className == undefined)
            ? "radio-form" : `radio-form ${this.props.className}`;

        return <Form
            className={className}
            header={this.props.header}
            onSubmit={this.props.onSubmit}
            submit={this.props.submit}
        >
            {choices}
        </Form>
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

export {Form, RadioForm, FormInput}
