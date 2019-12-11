import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Header, List, Container, Menu, Button } from 'semantic-ui-react';

// if user is logged in show Update Favorites Menu
// if user is not logged in show Sign-in Menu
const HeaderComponent = () => {
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
};


export default HeaderComponent;


// const HeaderComponent = () => {
// 	return (
// 		<Header>
// 			<List>
// 				{/*<List.Item><Link to = '/'>Home</Link></List.Item>*/}
// 				<List.Item><Link to = '/login'>Home</Link></List.Item>
// 				<List.Item><Link to = '/issues'>issue</Link></List.Item>
// 			</List>
// 		</Header>
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