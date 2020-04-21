import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';


const fCStyle = {
	border: '2px solid gold',
	backgroundColor: 'lightblue',
	position: 'fixed',
	bottom: 0,
	zIndex: 55,
	width: '100vw',
}

class FooterComponent extends Component {
	constructor() {
		super();
		this.state = {

		}
	}

	render() {
		return(
			<div style={fCStyle}>
				<Table 
			    	className='advertisement'
			  		unstackable
				>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>Your Ad Here</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>
				</Table>
			</div>
		)
	}
}

export default FooterComponent;