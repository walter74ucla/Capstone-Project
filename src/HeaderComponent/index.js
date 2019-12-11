import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Header, List, Container, Menu, Button } from 'semantic-ui-react';

// if user is logged in show Update Favorites Menu
// if user is not logged in show Sign-in Menu
class HeaderComponent extends Component {
	constructor() {
		super();

		// this.state = {
		// 	screen_name: '',

		// }
	}

	render(){
		console.log(this.props);
	    return (
	    	<React.Fragment>
	    		<Header>
					<Container>
				      <Menu stackable>
				        <Menu.Item>Sign-in</Menu.Item>
				        <Menu.Item>Register</Menu.Item>
				      </Menu>
				    </Container>
				    <Container>
				      <Menu stackable>
				        <Menu.Item>Update Favorites</Menu.Item>
				        <Menu.Item>Log Out</Menu.Item>
				        <Menu.Item>Hi User</Menu.Item>
				        <Button>Edit Screen Name</Button>
				      </Menu>
				    </Container>
				</Header>
	      	</React.Fragment>
	    )
	}

}


export default HeaderComponent;





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