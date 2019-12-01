import React, { Component } from 'react';
import GameList from '../GameList';
import DropdownExampleControlled from '../DateInputForm';

class BoxscoreContainer extends Component {
	constructor() {
		super();
		// this is the initial "state" of our boxscore object
	 	// this is mimicking the structure of our API information. 
	    this.state = {
	      date: {// need to define all key-value pairs (properties) if you want to lift state
	      	api: {
	      		filters: [],
	      		games: [],
	      		message: "",
	      		results: 0,
	      		status: 0
	      	}
	      },
	      datePlusOne: {// need to define all key-value pairs (properties) if you want to lift state
	      	api: {
	      		filters: [],
	      		games: [],
	      		message: "",
	      		results: 0,
	      		status: 0
	      	}
	      },
	      teamsLeagueStandard: {

	      },
		}
	}
	
	getGender = async (e, genderFromTheForm) => {
	    e.preventDefault();
	    console.log(genderFromTheForm)
    
    }

	getBoxscoreData = async () => {
		
		try {
			// the endpoint is the url we are making our request to.
	      	// fetch is a native js function that makes http requests
	      	// by default it makes a get request
	      	// we use fetch when we don't want to refresh the page
	      	const date = await fetch("https://api-nba-v1.p.rapidapi.com/games/date/2019-11-30", {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
					"x-rapidapi-key": "d6b3a2676dmsh79d3be25f7311bfp17de4ejsn779b55e60866"
				}
			})

			const datePlusOne = await fetch("https://api-nba-v1.p.rapidapi.com/games/date/2019-12-01", {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
					"x-rapidapi-key": "d6b3a2676dmsh79d3be25f7311bfp17de4ejsn779b55e60866"
				}
			})

			const teamsLeagueStandard = await fetch("https://api-nba-v1.p.rapidapi.com/teams/league/standard", {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
					"x-rapidapi-key": "d6b3a2676dmsh79d3be25f7311bfp17de4ejsn779b55e60866"
				}
			})
			// our response will be in the form of JSON, a string
	      	// data is sent across the internet as JSON
	      	// parse the JSON is turning the string into objects
	      	const parsedDate = await date.json();
	      	const parsedDatePlusOne = await datePlusOne.json();
	      	const parsedteamsLeagueStandard = await teamsLeagueStandard.json();
			// we should always log out the response before we 
	      	// write any other code!
	      	// console logging the parsed data did not work until creating the componentDidMount() method
			console.log(parsedDate);
			console.log(parsedDatePlusOne);
			console.log(parsedteamsLeagueStandard);
			
			this.setState({
				date: parsedDate,
				datePlusOne: parsedDatePlusOne,
				teamsLeagueStandard: parsedteamsLeagueStandard
			})
			console.log(this.state);
		} catch(err){
			console.log(err);
		}
		
	}	

	componentDidMount(){
    // get called once, after the initial render
    // is the component on the dom? ComponentDidMount
    // any calls to an external data source that we want connected
    // as soon as our app is loaded we call it in componentDidMount
    	this.getBoxscoreData()
    
  	}

  	
    	
  	render() {
	  	console.log(this.state.date.api.games);
	  	console.log(this.state.datePlusOne.api.games);
	  	return(
	  		<React.Fragment>
      			Some BoxscoreContainer text.
      			<DropdownExampleControlled inputDate={this.getGender}/>
      			<GameList 
      				gameDate={this.state.date.api.games}
      				gameDatePlusOne={this.state.datePlusOne.api.games}
      			/>
    		</React.Fragment>
  		)
  	}

}

export default BoxscoreContainer
