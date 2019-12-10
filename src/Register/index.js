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

        if (parsedResponse.status.code === 200) {
            console.log('Registration successful');
            this.props.history.push('/favorite_teams'); // Change url to /favorite_teams programmatically with react-router
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
                    <Form.Input type='text' name="screen_name" onChange={this.handleChange} />
                    <Label> Email</Label>
                    <Form.Input type='text' name="email" onChange={this.handleChange} />
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