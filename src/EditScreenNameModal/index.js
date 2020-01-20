import React from 'react';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';


const EditScreenNameModal = (props) => {
	console.log(props);
	return (
		<Modal open={props.open}>
			<Header>Edit Screen Name</Header>
			<Modal.Content>
				<Form onSubmit={props.closeAndEdit}>
					<Label>
						Screen Name (10 character limit):
					</Label>
					<Form.Input type='text' name='screen_name' maxLength='10' value={props.userToEdit.screen_name} onChange={props.handleEditChange}/>
					<Modal.Actions>
						<Button color='green' type='submit'>Edit Screen Name</Button>
					</Modal.Actions>
				</Form>
			</Modal.Content>
		</Modal>
		)
}











export default EditScreenNameModal;