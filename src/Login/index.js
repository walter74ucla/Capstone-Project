import React, { Component } from 'react';
import { Form, Label, Button, Message } from 'semantic-ui-react';


class Login extends Component {
	constructor() {
		super();

		this.state = {
			screen_name: '',
			email: '',
			password_hash: ''
		}
	}

	// Handling of form value change
	handleChange = (e) => {
		// e.preventDefault();//don't think I need this
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
			// We are using one function in the above to update our 
			// state based on the variable e.currentTarget.name that 
			// gets its value from the name attribute on the form.
		})
	}

	// Submission of login in form
	handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Email & Password:', this.state);//want to see the hash
		const loginUrl = `${process.env.REACT_APP_API_URL}/api/v1/users/login`; //localhost:8000/api/v1/users/login
		// this is users.  this matches flask app.py: app.register_blueprint(user, url_prefix='/api/v1/users')
		const loginResponse = await fetch(loginUrl, {
			method: 'POST',
			body: JSON.stringify(this.state),
			credentials: 'include', // Send a session cookie along with our request
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const parsedResponse = await loginResponse.json();

		if (parsedResponse.status.code === 200) {
			console.log('Login successful');
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
                    <h4>Sign In</h4>
                    <Label>Email</Label>
                    <Form.Input type="email" name="email" onChange={this.handleChange} required />
                    <Label>Password</Label>
                    <Form.Input type="password" name="password" onChange={this.handleChange} required />
                    <Button type="submit" color="green">Login</Button>
                    { this.state.errorMsg ? <Message negative>{this.state.errorMsg}</Message> : null }
                </Form>
	      	</React.Fragment>
	    )
	}
}


export default Login;