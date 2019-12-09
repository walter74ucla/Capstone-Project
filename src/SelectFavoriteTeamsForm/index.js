//Example found here..
//https://react.semantic-ui.com/addons/radio/#types-radio-group
import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'

class SelectFavoriteTeams extends Component {
 //  	constructor(){//How do I link this to the flask db???
	// 	super();

	// 	this.state = {
	// 		name: '', //this should add favortite teams to the flask db 
	// 				 //FavoriteTeam(Model)
	// 				 //may only need two models if favorite teams are 
	// 				 //defined in this container
	// 				 //this form should display previously selected favorite
	// 				 //teams for the user

	// 	}
	// }
  
  	// How do I link this to the flask db???
  	state = {}
	handleChange = (e, { value }) => this.setState({ value })

	// handleSubmit = (e) =>{//should update favorite teams based on selections
	// 	this.props.addFavoriteTeam(e, this.state);//multiple???
	// 	// this.setState({name:''})//I do not want the form to be reset
	// 	this.props.deleteFavoriteTeam(e, this.state);//multiple???
	// }
	// need to eventually add this --> onSubmit={this.handleSubmit}

// Note
// You can pass an array into the value attribute, allowing you to select multiple options in a select tag:
// <select multiple={true} value={['B', 'C']}>


  	render() {//Select Multiple Teams???
	    return (
	      	<Form>
	      	<Button type='Submit'>Submit Favorites</Button>
		        {/*<Form.Field>
		          Selected value: <b>{this.state.value}</b>
		        </Form.Field>*/}
		        <Form.Field>
		          <Radio
		            label='Atlanta Hawks'
		            name='radioGroup'
		            value='Atlanta Hawks'
		            checked={this.state.value === 'Atlanta Hawks'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Boston Celtics'
		            name='radioGroup'
		            value='Boston Celtics'
		            checked={this.state.value === 'Boston Celtics'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Brooklyn Nets'
		            name='radioGroup'
		            value='Brooklyn Nets'
		            checked={this.state.value === 'Brooklyn Nets'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Charlotte Hornets'
		            name='radioGroup'
		            value='Charlotte Hornets'
		            checked={this.state.value === 'Charlotte Hornets'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Chicago Bulls'
		            name='radioGroup'
		            value='Chicago Bulls'
		            checked={this.state.value === 'Chicago Bulls'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Cleveland Cavaliers'
		            name='radioGroup'
		            value='Cleveland Cavaliers'
		            checked={this.state.value === 'Cleveland Cavaliers'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Dallas Mavericks'
		            name='radioGroup'
		            value='Dallas Mavericks'
		            checked={this.state.value === 'Dallas Mavericks'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Denver Nuggets'
		            name='radioGroup'
		            value='Denver Nuggets'
		            checked={this.state.value === 'Denver Nuggets'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Detroit Pistons'
		            name='radioGroup'
		            value='Detroit Pistons'
		            checked={this.state.value === 'Detroit Pistons'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Golden State Warriors'
		            name='radioGroup'
		            value='Golden State Warriors'
		            checked={this.state.value === 'Golden State Warriors'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Houston Rockets'
		            name='radioGroup'
		            value='Houston Rockets'
		            checked={this.state.value === 'Houston Rockets'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Indiana Pacers'
		            name='radioGroup'
		            value='Indiana Pacers'
		            checked={this.state.value === 'Indiana Pacers'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Los Angeles Clippers'
		            name='radioGroup'
		            value='Los Angeles Clippers'
		            checked={this.state.value === 'Los Angeles Clippers'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Los Angeles Lakers'
		            name='radioGroup'
		            value='Los Angeles Lakers'
		            checked={this.state.value === 'Los Angeles Lakers'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Memphis Grizzlies'
		            name='radioGroup'
		            value='Memphis Grizzlies'
		            checked={this.state.value === 'Memphis Grizzlies'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Miami Heat'
		            name='radioGroup'
		            value='Miami Heat'
		            checked={this.state.value === 'Miami Heat'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Milwaukee Bucks'
		            name='radioGroup'
		            value='Milwaukee Bucks'
		            checked={this.state.value === 'Milwaukee Bucks'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Minnesota Timberwolves'
		            name='radioGroup'
		            value='Minnesota Timberwolves'
		            checked={this.state.value === 'Minnesota Timberwolves'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='New Orleans Pelicans'
		            name='radioGroup'
		            value='New Orleans Pelicans'
		            checked={this.state.value === 'New Orleans Pelicans'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='New York Knicks'
		            name='radioGroup'
		            value='New York Knicks'
		            checked={this.state.value === 'New York Knicks'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Oklahoma City Thunder'
		            name='radioGroup'
		            value='Oklahoma City Thunder'
		            checked={this.state.value === 'Oklahoma City Thunder'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Orlando Magic'
		            name='radioGroup'
		            value='Orlando Magic'
		            checked={this.state.value === 'Orlando Magic'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Philadelphia 76ers'
		            name='radioGroup'
		            value='Philadelphia 76ers'
		            checked={this.state.value === 'Philadelphia 76ers'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Phoenix Suns'
		            name='radioGroup'
		            value='Phoenix Suns'
		            checked={this.state.value === 'Phoenix Suns'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Portland Trail Blazers'
		            name='radioGroup'
		            value='Portland Trail Blazers'
		            checked={this.state.value === 'Portland Trail Blazers'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Sacramento Kings'
		            name='radioGroup'
		            value='Sacramento Kings'
		            checked={this.state.value === 'Sacramento Kings'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='San Antonio Spurs'
		            name='radioGroup'
		            value='San Antonio Spurs'
		            checked={this.state.value === 'San Antonio Spurs'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Toronto Raptors'
		            name='radioGroup'
		            value='Toronto Raptors'
		            checked={this.state.value === 'Toronto Raptors'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Utah Jazz'
		            name='radioGroup'
		            value='Utah Jazz'
		            checked={this.state.value === 'Utah Jazz'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
		        <Form.Field>
		          <Radio
		            label='Washington Wizards'
		            name='radioGroup'
		            value='Washington Wizards'
		            checked={this.state.value === 'Washington Wizards'}
		            onChange={this.handleChange}
		          />
		        </Form.Field>
	      	</Form>
	    )
  	}
}


export default SelectFavoriteTeams