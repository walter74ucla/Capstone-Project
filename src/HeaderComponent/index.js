import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Header, Container, Menu, Button } from 'semantic-ui-react';
import EditScreenNameModal from '../EditScreenNameModal';

// if user is logged in show Update Favorites Menu
// if user is not logged in show Sign-in Menu
class HeaderComponent extends Component {
	constructor() {
		super();

		this.state = {
			users: [],//get all the users from the flask db
			userToEdit: {//find a user to edit
				logged: '',
				screen_name: '',
			   	email: '',
			    id: '',
			    logout: ''	
			},			
			showEditModal: false
		}
		console.log(this.state);
	}

	componentDidMount(){
		this.getUsers();
	}

	getUsers = async () => {

		try {
			const users = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/',
				{ // added this callback to send over the session cookie
					credentials: 'include',
					method: "GET"
				});
			const parsedUsers = await users.json();
			console.log(parsedUsers);

			this.setState({
				users: parsedUsers.data
			})
		
	} catch(err){
		console.log(err);
		}
	}

	openEditModal = async (userFromGetUsers) => {
		console.log(userFromGetUsers, ' userToEdit ');//use this object to get the id
		console.log(userFromGetUsers.id);
		
		// want to do the validations on the server, not the client
		const user = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/' + userFromGetUsers.id + '/',
				{ // added this callback to send over the session cookie
					credentials: 'include',
					method: "GET"
				});
		const parsedUser = await user.json();
		console.log(parsedUser, ' parsedUser');
      	if (parsedUser.status.code === 401) {
	      	alert ("You cannot edit a screen name that you did not create")
	    } else {
	      	this.setState({
				showEditModal: true,
				userToEdit: {
					...userFromGetUsers
				}
			})
	    } 
	    console.log(this.state);		
	}
      	
	handleEditChange = (e) => {
    	this.setState({
      		userToEdit: {
        		...this.state.userToEdit,
        		[e.currentTarget.name]: e.currentTarget.value
      		}
    	})
  	}

  	closeAndEdit = async (e) => {
    	e.preventDefault();

    	try {

      		const editResponse = await 
	      		fetch(process.env.REACT_APP_API_URL + '/api/v1/users/' + this.state.userToEdit.id + '/', {
	        		method : "PUT",
	        		credentials: 'include', // Send a session cookie along with our request
	        		body: JSON.stringify(this.state.userToEdit),
	        		headers: {
	          			'Content-Type' : 'application/json'
	        		}
	      		});

		   	const editResponseParsed = await editResponse.json();
		   	console.log('editResponseParsed: ', editResponseParsed);

		  	const newUserArrayWithEdit = this.state.users.map((user)=> {
		        if(user.id === editResponseParsed.data.id) {
		            user = editResponseParsed.data
		        }
		        return user;
		        })
		      
		   	this.setState({
		        users: newUserArrayWithEdit,
		        showEditModal: false
		   	})

		} catch(err) {
		   	console.log(err);
		}
	}

	logoutMethod = () => {
		this.props.logout();
		this.props.history.push('/');
		window.location.reload();
	}

	render(){
		console.log('props...', this.props);
		// this.getUsers();//this gives me an infinite loop in the console

		let user = this.state.users.find(user => user.id === this.props.id);
		console.log('user...', user);
		if(typeof user === "undefined" && this.state.users.length < this.props.id){
			this.getUsers();
			user = this.state.users.find(user => user.id === this.props.id);			
		} else {
			user = user;
		}

		const fullURL = window.location.href;
		console.log(fullURL);
		const homepageDev = "http://localhost:3000/";
		const favoritespageDev = "http://localhost:3000/favorite_teams";
		const homepageProd = "https://react-boxscore-app.herokuapp.com/";
		const favoritespageProd = "https://react-boxscore-app.herokuapp.com/favorite_teams";

	    return (
	    	<React.Fragment>
	    		{this.props.logged ?
	    			<Header>
						<Container>
					      <Menu stackable>
					        {fullURL === (homepageDev || homepageProd)
					        	?	<Menu.Item>
					        			<Link to = '/favorite_teams'>Update Favorites</Link>
					        		</Menu.Item>
					        	: fullURL === (favoritespageDev || favoritespageProd)
					        	?	<Menu.Item><Link to = '/'>Homepage</Link></Menu.Item>
					        	: null
					        }
					        <Menu.Item>Hi {user ? user.screen_name : this.props.screen_name}!</Menu.Item>
					        <Button onClick={() => this.openEditModal(user)}>Edit Screen Name</Button>
					        <Button onClick={() => this.logoutMethod()}>Log Out</Button>
					      </Menu>
					    </Container>
					    <EditScreenNameModal 
					    	handleEditChange={this.handleEditChange} 
					    	open={this.state.showEditModal} 
					    	userToEdit={this.state.userToEdit} 
					    	closeAndEdit={this.closeAndEdit}
					    />
					</Header> 
				    :
				    <Header>
					    <Container>
					      <Menu stackable>
					        <Menu.Item><Link to = '/login'>Sign-in</Link></Menu.Item>
					        <Menu.Item><Link to = '/register'>Register</Link></Menu.Item>
					      </Menu>
					    </Container>  
					</Header>
	    		}
	      	</React.Fragment>
	    )
	}

}


export default withRouter(HeaderComponent);




// This worked...
// render(){
// 		console.log(this.props);
// 	    return (
// 	    	<React.Fragment>
// 	    		<Header>
// 					<Container>
// 				      <Menu stackable>
// 				        <Menu.Item>Update Favorites</Menu.Item>
// 				        <Menu.Item>Log Out</Menu.Item>
// 				        <Menu.Item>Hi {this.props.screen_name}!</Menu.Item>
// 				        <Button>Edit Screen Name</Button>
// 				      </Menu>
// 				    </Container>
// 				    <Container>
// 				      <Menu stackable>
// 				        <Menu.Item>Sign-in</Menu.Item>
// 				        <Menu.Item>Register</Menu.Item>
// 				      </Menu>
// 				    </Container>  
// 				</Header>
// 	      	</React.Fragment>
// 	    )
// 	}








// This worked...
// const HeaderComponent = () => {
// 	return (
// 		<React.Fragment>
//     		<Header>
// 				<Container>
// 			      <Menu stackable>
// 			        <Menu.Item>Sign-in</Menu.Item>
// 			        <Menu.Item>Register</Menu.Item>
// 			      </Menu>
// 			    </Container>
// 			    <Container>
// 			      <Menu stackable>
// 			        <Menu.Item>Update Favorites</Menu.Item>
// 			        <Menu.Item>Log Out</Menu.Item>
// 			        <Menu.Item>Hi User</Menu.Item>
// 			        <Button>Edit Screen Name</Button>
// 			      </Menu>
// 			    </Container>
// 			</Header>
// 	    </React.Fragment>
// 	)
// };


// class HeaderComponent extends Component {
// 	constructor() {
// 		super();

// 		this.state = {
// 			screen_name: '',
			

// 		}
// 	}

// 	render(){
// 	    return (
// 	    	<React.Fragment>
// 	    		<Header>
// 					<Container>
// 				      <Menu stackable>
// 				        <Menu.Item>Sign-in</Menu.Item>
// 				        <Menu.Item>Register</Menu.Item>
// 				      </Menu>
// 				    </Container>
// 				    <Container>
// 				      <Menu stackable>
// 				        <Menu.Item>Update Favorites</Menu.Item>
// 				        <Menu.Item>Log Out</Menu.Item>
// 				        <Menu.Item>Hi User</Menu.Item>
// 				        <Button>Edit Screen Name</Button>
// 				      </Menu>
// 				    </Container>
// 				</Header>
// 	      	</React.Fragment>
// 	    )
// 	}

// }