import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Header, List, Container, Menu, Button } from 'semantic-ui-react';
import EditScreenNameModal from '../EditScreenNameModal';

// if user is logged in show Update Favorites Menu
// if user is not logged in show Sign-in Menu
class HeaderComponent extends Component {
	constructor() {
		super();

		this.state = {
			screen_name: '',
			screenNameToEdit: {
				screen_name: '',
				created_at: '',
				id: ''
			},
			showEditModal: false
		}
	}

	openEditModal = async (userToEdit) => {
		console.log(userToEdit, ' userToEdit ');//want to update screen name by user
		console.log(userToEdit.id);
		
		// if the user that is logged in created the screen name then show modal
		// else alert "You cannot edit a screen name that you did not create"
		
		// want to do the validations on the server, not the client
		const user = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/' + userToEdit.id + '/',
				{ // added this callback to send over the session cookie
					credentials: 'include',
					method: "GET"
				});
		const parsedUser = await user.json();
		console.log(parsedUser, ' parsedUser');
		console.log(userToEdit.created_by.id);
		console.log(parsedUser.data.created_by.id);
      	if (parsedUser.status.code === 401) {
	      	alert ("You cannot edit a screen name that you did not create")
	    } else {
	      	this.setState({
				showEditModal: true,
				userToEdit: {
					...userToEdit
				}
			})
	    }		
	}
      	
	handleEditChange = (e) => {
    	this.setState({
      		screenNameToEdit: {
        		...this.state.screenNameToEdit,
        [e.currentTarget.name]: e.currentTarget.value
      		}
    	})
  	}

  	closeAndEdit = async (e) => {
    	e.preventDefault();

    	try {

      		const editResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/' + this.state.userToEdit.id + '/', {
        		method : "PUT",
        		credentials: 'include', // Send a session cookie along with our request
        		body: JSON.stringify(this.state.userToEdit),
        		headers: {
          			'Content-Type' : 'application/json'
        		}
      		});

		   	const editResponseParsed = await editResponse.json();
		   	console.log('editResponseParsed: ', editResponseParsed);

		   	// I think this should be one screen name 
		  	const newUserArrayWithEdit = this.state.users.map((user)=> {
	        if(user.id === editResponseParsed.data.id) {
	            user = editResponseParsed.data
	        }
	        return user;
	        })
	      
		  	this.setState({
	        	screen_name: newUserArrayWithEdit,
	        	showEditModal: false
	      	})

	    } catch(err) {
	      console.log(err);
	    }

  	}

	render(){
		console.log(this.props);
	    return (
	    	<React.Fragment>
	    		{this.props.logged ?
	    			<Header>
						<Container>
					      <Menu stackable>
					        <Menu.Item>Update Favorites</Menu.Item>
					        <Menu.Item>Log Out</Menu.Item>
					        <Menu.Item>Hi {this.props.screen_name}!</Menu.Item>
					        <Button onClick={() => this.openEditModal()}>Edit Screen Name</Button>
					        <Button onClick={() => this.props.logout()}>Log Out</Button>
					      </Menu>
					    </Container>
					    <EditScreenNameModal handleEditChange={this.handleEditChange} open={this.state.showEditModal} screenNameToEdit={this.state.screenNameToEdit} closeAndEdit={this.closeAndEdit}/>
					</Header> 
				    :
				    <Header>
					    <Container>
					      <Menu stackable>
					        <Menu.Item>Sign-in</Menu.Item>
					        <Menu.Item>Register</Menu.Item>
					      </Menu>
					    </Container>  
					</Header>
	    		}
	      	</React.Fragment>
	    )
	}

}


export default HeaderComponent;




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