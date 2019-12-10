import React, { Component } from 'react';



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
	    		<h4>Login</h4>
		      	<form onSubmit={this.handleSubmit}>
			        <input type='text' name="screen_name" placeholder="screen name" />
			        <input type='password' name="password" placeholder="password" />
			        <input type='submit' value="Submit" />
		      	</form>
	      	</React.Fragment>
	    )
	}
}


export default Login;