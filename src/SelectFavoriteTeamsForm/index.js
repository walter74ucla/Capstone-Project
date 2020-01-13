import React, { Component } from 'react'
import { Form, Radio, Button, Container, Menu, Header, Image} from 'semantic-ui-react'

class SelectFavoriteTeams extends Component {
  	constructor(){//How do I link this to the flask db???
		super();

		this.state = {//does this need props???
			name: '', //this should add favortite teams to the flask db 
			// favoriteTeams: [props.favoriteTeams], // insert user props in the [] to get existing Favorite Teams	 
			favoriteTeams: [],
		}
	}

	componentDidMount(){
    	this.getFavoriteTeams()
    
  	}
	
	getFavoriteTeams = async () => {

		try {
			const favoriteTeams = await fetch(process.env.REACT_APP_API_URL + '/api/v1/favorite_teams/',
				{ // added this callback to send over the session cookie
					credentials: 'include',
					method: "GET"
				});
			const parsedfavoriteTeams = await favoriteTeams.json();
			console.log(parsedfavoriteTeams);

			//https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
			let getFTArray = parsedfavoriteTeams.data.map(item => item.name)
  							.filter((value, index, self) => self
  							.indexOf(value) === index)

  			console.log(getFTArray);

			this.setState({
				favoriteTeams: getFTArray
			})
		
	} catch(err){
		console.log(err);
		}
	}

	//code help from Will...
	handleFavoriteTeamsChange = (e) => {
	    let favoriteTeams = this.state.favoriteTeams;
	    let team = e.currentTarget.name;
	    // let teamIdx;
	    if (this.state.favoriteTeams.includes(team)) {
	      // We are deleting Favorite
	      // teamIdx = this.state.favoriteTeams.indexOf(team);
	      this.deleteFavoriteTeam(team);
	      // favoriteTeams.splice(teamIdx, 1);
	    } else {
	      this.addFavoriteTeam(team);    
	    }
	    this.setState({
	      favoriteTeams: favoriteTeams
	    })
	}

	deleteFavoriteTeam = async (name) => {

		console.log(name)
		const deleteFavoriteTeamResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/favorite_teams/' + name + '/', {// strange + '/' CORS error again
													method: 'DELETE',
													credentials: 'include' // Send a session cookie along with our request
												});
		const deleteFavoriteTeamParsed = await deleteFavoriteTeamResponse.json();
		// console.log(deleteFavoriteTeamResponse)
		if (deleteFavoriteTeamParsed.status.code === 200) {
			// now that the db has deleted our item, we need to remove it from state
			this.setState({favoriteTeams: this.state.favoriteTeams.filter((favoriteTeam) => favoriteTeam !== name )})

		} else {
			alert ("You cannot delete a Favorite Team that you did not create")
		}

		console.log(deleteFavoriteTeamParsed, ' response from Flask server')
			// then make the delete request, then remove the favorite team from the state array using filter
			// what about handling multiple delete requests at once?

	}

	addFavoriteTeam = async (favoriteTeam) => {
		// e.preventDefault();
		console.log(favoriteTeam);

		try {

			// Send JSON
			// createdIssue variable storing response from Flask API
			const createdFavoriteTeamResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/favorite_teams/', {
				method: 'POST',
				credentials: 'include', // added this to send over the session cookie
				body: JSON.stringify({name: favoriteTeam}),//passing an object here
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
			// turn the response from Flask into an object we can use
			const parsedResponse = await createdFavoriteTeamResponse.json();
			console.log(parsedResponse, ' this is response');
			const team =  parsedResponse.data.name;

			// empty all issues in state to new array then
			// adding issue we created to the end of it (created shows up first until refresh then at the bottom)
			// what about handling multiple add requests at once?

			this.setState({favoriteTeams: [team, ...this.state.favoriteTeams]})
		
		} catch(err){
			console.log('error')
			console.log(err)
		}
	}


  	render() {//Select Multiple Teams
  		// const teams = ['Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'Los Angeles Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Hornets', 'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards']
	    const teams = [
		    	{teamId: "1", logo: "https://i.imgur.com/Kq7BbKr.png", fullName: "Atlanta Hawks"},
		    	{teamId: "2", logo: "https://i.imgur.com/ZllxvAh.png", fullName: "Boston Celtics"},
		    	{teamId: "4", logo: "https://i.imgur.com/dYRpuUv.png", fullName: "Brooklyn Nets"},
		    	{teamId: "5", logo: "https://i.imgur.com/PfpXC35.png", fullName: "Charlotte Hornets"},
		    	{teamId: "6", logo: "https://i.imgur.com/uDPZD27.png", fullName: "Chicago Bulls"},
		    	{teamId: "7", logo: "https://i.imgur.com/4pYMk58.png", fullName: "Cleveland Cavaliers"},
		    	{teamId: "8", logo: "https://i.imgur.com/XXeM6G7.png", fullName: "Dallas Mavericks"},
		    	{teamId: "9", logo: "https://i.imgur.com/0A7zhXs.png", fullName: "Denver Nuggets"},
		    	{teamId: "10", logo: "https://i.imgur.com/LEN2Uzh.png", fullName: "Detroit Pistons"},
		    	{teamId: "11", logo: "https://i.imgur.com/dsW68hf.png", fullName: "Golden State Warriors"},
		    	{teamId: "14", logo: "https://i.imgur.com/DXzHlmE.png", fullName: "Houston Rockets"},
		    	{teamId: "15", logo: "https://i.imgur.com/WFMfKNm.png", fullName: "Indiana Pacers"},
		    	{teamId: "16", logo: "https://i.imgur.com/e9B9ivY.png", fullName: "LA Clippers"},
		    	{teamId: "17", logo: "https://i.imgur.com/idShkvb.png", fullName: "Los Angeles Lakers"},
		    	{teamId: "19", logo: "https://i.imgur.com/AepoT1u.png", fullName: "Memphis Grizzlies"},
		    	{teamId: "20", logo: "https://i.imgur.com/tjwoBkp.gif", fullName: "Miami Heat"},
		    	{teamId: "21", logo: "https://i.imgur.com/58aufKB.png", fullName: "Milwaukee Bucks"},
		    	{teamId: "22", logo: "https://i.imgur.com/l2mjOHW.png", fullName: "Minnesota Timberwolves"},
		    	{teamId: "23", logo: "https://i.imgur.com/Nck6QZe.png", fullName: "New Orleans Pelicans"},
		    	{teamId: "24", logo: "https://i.imgur.com/9xJE809.gif", fullName: "New York Knicks"},
		    	{teamId: "25", logo: "https://i.imgur.com/x9dp5Ms.png", fullName: "Oklahoma City Thunder"},
		    	{teamId: "26", logo: "https://i.imgur.com/cpuQ0MH.gif", fullName: "Orlando Magic"},
		    	{teamId: "27", logo: "https://i.imgur.com/XOkEq0U.png", fullName: "Philadelphia 76ers"},
		    	{teamId: "28", logo: "https://i.imgur.com/Abf9NDQ.png", fullName: "Phoenix Suns"},
		    	{teamId: "29", logo: "https://i.imgur.com/2hGMgQw.png", fullName: "Portland Trail Blazers"},
		    	{teamId: "30", logo: "https://i.imgur.com/hfVnJcc.png", fullName: "Sacramento Kings"},
		    	{teamId: "31", logo: "https://i.imgur.com/HJjSNa4.png", fullName: "San Antonio Spurs"},
		    	{teamId: "38", logo: "https://i.imgur.com/HEVWO0q.png", fullName: "Toronto Raptors"},
	    		{teamId: "40", logo: "https://i.imgur.com/BpzstID.png", fullName: "Utah Jazz"},
	    		{teamId: "41", logo: "https://i.imgur.com/8LCV448.png", fullName: "Washington Wizards"},
		    ]
	    const teamCheckbox = teams.map((team) => (
	    	<Form.Field key={team.teamId}
	            label=
	            	{<label>
	            		<Header as='h4' image>
		        			<Image src={team.logo} size='tiny' />	
				        </Header>
				        {team.fullName}
				    </label>}	
	            name={team.fullName}
	            control='input'
	            type='checkbox'
	            checked={this.state.favoriteTeams.includes(team.fullName)}
	            onChange={this.handleFavoriteTeamsChange}
	          />
	    ))
	    return (
	    	<React.Fragment>
		      	<Form>
			        <Form.Group grouped>
			          <label>Favorite Teams: {this.state.favoriteTeams.join(', ')}</label>
			          { teamCheckbox }
			        </Form.Group>
		      	</Form>
	      	</React.Fragment>
	    )
  	}
}


export default SelectFavoriteTeams



// Note
// You can pass an array into the value attribute, allowing you to select multiple options in a select tag:
// <select multiple={true} value={['B', 'C']}>

//Example found here..
//https://react.semantic-ui.com/addons/radio/#types-radio-group
// tried this code below, but it did not do what I wanted.
// switching to checkmarks to answer the multiple selections probplem

	// state = {}
	// handleChange = (e, { value }) => this.setState({ value })

// render() {//Select Multiple Teams???
// 	    return (
// 	      	<Form>
// 	      	<Button type='Submit'>Submit Favorites</Button>
// 		        <Form.Field>
// 		          Selected value: <b>{this.state.value}</b>
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Atlanta Hawks'
// 		            name='radioGroup'
// 		            value='Atlanta Hawks'
// 		            checked={this.state.value === 'Atlanta Hawks'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Boston Celtics'
// 		            name='radioGroup'
// 		            value='Boston Celtics'
// 		            checked={this.state.value === 'Boston Celtics'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Brooklyn Nets'
// 		            name='radioGroup'
// 		            value='Brooklyn Nets'
// 		            checked={this.state.value === 'Brooklyn Nets'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Charlotte Hornets'
// 		            name='radioGroup'
// 		            value='Charlotte Hornets'
// 		            checked={this.state.value === 'Charlotte Hornets'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Chicago Bulls'
// 		            name='radioGroup'
// 		            value='Chicago Bulls'
// 		            checked={this.state.value === 'Chicago Bulls'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Cleveland Cavaliers'
// 		            name='radioGroup'
// 		            value='Cleveland Cavaliers'
// 		            checked={this.state.value === 'Cleveland Cavaliers'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Dallas Mavericks'
// 		            name='radioGroup'
// 		            value='Dallas Mavericks'
// 		            checked={this.state.value === 'Dallas Mavericks'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Denver Nuggets'
// 		            name='radioGroup'
// 		            value='Denver Nuggets'
// 		            checked={this.state.value === 'Denver Nuggets'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Detroit Pistons'
// 		            name='radioGroup'
// 		            value='Detroit Pistons'
// 		            checked={this.state.value === 'Detroit Pistons'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Golden State Warriors'
// 		            name='radioGroup'
// 		            value='Golden State Warriors'
// 		            checked={this.state.value === 'Golden State Warriors'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Houston Rockets'
// 		            name='radioGroup'
// 		            value='Houston Rockets'
// 		            checked={this.state.value === 'Houston Rockets'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Indiana Pacers'
// 		            name='radioGroup'
// 		            value='Indiana Pacers'
// 		            checked={this.state.value === 'Indiana Pacers'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Los Angeles Clippers'
// 		            name='radioGroup'
// 		            value='Los Angeles Clippers'
// 		            checked={this.state.value === 'Los Angeles Clippers'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Los Angeles Lakers'
// 		            name='radioGroup'
// 		            value='Los Angeles Lakers'
// 		            checked={this.state.value === 'Los Angeles Lakers'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Memphis Grizzlies'
// 		            name='radioGroup'
// 		            value='Memphis Grizzlies'
// 		            checked={this.state.value === 'Memphis Grizzlies'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Miami Heat'
// 		            name='radioGroup'
// 		            value='Miami Heat'
// 		            checked={this.state.value === 'Miami Heat'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Milwaukee Bucks'
// 		            name='radioGroup'
// 		            value='Milwaukee Bucks'
// 		            checked={this.state.value === 'Milwaukee Bucks'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Minnesota Timberwolves'
// 		            name='radioGroup'
// 		            value='Minnesota Timberwolves'
// 		            checked={this.state.value === 'Minnesota Timberwolves'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='New Orleans Pelicans'
// 		            name='radioGroup'
// 		            value='New Orleans Pelicans'
// 		            checked={this.state.value === 'New Orleans Pelicans'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='New York Knicks'
// 		            name='radioGroup'
// 		            value='New York Knicks'
// 		            checked={this.state.value === 'New York Knicks'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Oklahoma City Thunder'
// 		            name='radioGroup'
// 		            value='Oklahoma City Thunder'
// 		            checked={this.state.value === 'Oklahoma City Thunder'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Orlando Magic'
// 		            name='radioGroup'
// 		            value='Orlando Magic'
// 		            checked={this.state.value === 'Orlando Magic'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Philadelphia 76ers'
// 		            name='radioGroup'
// 		            value='Philadelphia 76ers'
// 		            checked={this.state.value === 'Philadelphia 76ers'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Phoenix Suns'
// 		            name='radioGroup'
// 		            value='Phoenix Suns'
// 		            checked={this.state.value === 'Phoenix Suns'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Portland Trail Blazers'
// 		            name='radioGroup'
// 		            value='Portland Trail Blazers'
// 		            checked={this.state.value === 'Portland Trail Blazers'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Sacramento Kings'
// 		            name='radioGroup'
// 		            value='Sacramento Kings'
// 		            checked={this.state.value === 'Sacramento Kings'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='San Antonio Spurs'
// 		            name='radioGroup'
// 		            value='San Antonio Spurs'
// 		            checked={this.state.value === 'San Antonio Spurs'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Toronto Raptors'
// 		            name='radioGroup'
// 		            value='Toronto Raptors'
// 		            checked={this.state.value === 'Toronto Raptors'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Utah Jazz'
// 		            name='radioGroup'
// 		            value='Utah Jazz'
// 		            checked={this.state.value === 'Utah Jazz'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 		        <Form.Field>
// 		          <Radio
// 		            label='Washington Wizards'
// 		            name='radioGroup'
// 		            value='Washington Wizards'
// 		            checked={this.state.value === 'Washington Wizards'}
// 		            onChange={this.handleChange}
// 		          />
// 		        </Form.Field>
// 	      	</Form>
// 	    )
//   	}
// }
