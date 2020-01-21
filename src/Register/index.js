import React, { Component } from 'react';
import { Form, Label, Button, Message } from 'semantic-ui-react';


class Register extends Component {
    constructor(){
        super();

        this.state = {
          screen_name: '',
          email: '',
          password_hash: '',
          
        }
    }

    handleChange = (e) => {
        this.setState({
          [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // this.props.login(this.state.screen_name);
        console.log('hello');
        const registerResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/register', {
            method: 'POST',
            credentials: 'include', // this sends our session cookie with our request
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const parsedResponse = await registerResponse.json();

        if (parsedResponse.status.code === 201) {
            console.log('Registration successful');
            // Do something to make React know a user registered/logged in
            let loginScreenName = parsedResponse.data.screen_name;
            let loginEmail = parsedResponse.data.email;
            let loginId = parsedResponse.data.id;
            // console.log(loginScreenName+", "+loginEmail+", "+loginId);

            this.setState({
                screen_name: loginScreenName,
                email: loginEmail,
                id: loginId
            });
            this.props.login(this.state.screen_name, this.state.email, this.state.id)// lift this up to the parent container App.js (receiving props from a component rendered by react router)
            this.props.history.push('/'); // Change url to / programmatically with react-router (could go to another route)
        } else {
            // Else display error message to the user
            this.setState({
                errorMsg: parsedResponse.status.message
            });
        }
    }


    render(){
        return (
            <React.Fragment>
                <Form onSubmit={this.handleSubmit}>
                    <Label> Screen Name (10 character limit)</Label>
                    <Form.Input type="text" name="screen_name" maxLength="10" onChange={this.handleChange} />
                    <Label> Email</Label>
                    <Form.Input type="email" name="email" onChange={this.handleChange} />
                    <Label> Password</Label>
                    <Form.Input type='password' name="password_hash" onChange={this.handleChange} />
                    <Button type="Submit" color="green">Register</Button>
                    { this.state.errorMsg ? <Message negative>{this.state.errorMsg}</Message> : null }
                </Form>
            </React.Fragment>
        )
    }
}

export default Register;