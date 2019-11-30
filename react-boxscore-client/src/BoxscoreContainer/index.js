import React, { Component } from 'react';


class BoxscoreContainer extends Component {
	constructor() {
		super();
		// this is the initial "state" of our weather object
	 	// this is mimicking the structure of our API information. 
	    this.state = {
	      seasons: {

	      },
	      leagues: {
	        
	      },
	      teamsLeagueStandard: {

	      },
		}
	}
	
	getBoxscoreData = async () => {
		
		try {
			// the endpoint is the url we are making our request to.
	      	// fetch is a native js function that makes http requests
	      	// by default it makes a get request
	      	// we use fetch when we don't want to refresh the page
	      	const seasons = await fetch("https://api-nba-v1.p.rapidapi.com/seasons/", {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
					"x-rapidapi-key": "d6b3a2676dmsh79d3be25f7311bfp17de4ejsn779b55e60866"
				}
			})

			const leagues = await fetch("https://api-nba-v1.p.rapidapi.com/leagues/", {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
					"x-rapidapi-key": "d6b3a2676dmsh79d3be25f7311bfp17de4ejsn779b55e60866"
				}
			});

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
	      	const parsedSeasons = await seasons.json();
	      	const parsedLeagues = await leagues.json();
	      	const parsedteamsLeagueStandard = await teamsLeagueStandard.json();
			// we should always log out the response before we 
	      	// write any other code!
	      	// console logging the parsed data did not work until creating the componentDidMount() method
			console.log(parsedSeasons);
			console.log(parsedLeagues);
			console.log(parsedteamsLeagueStandard);
			
			this.setState({
				seasons: parsedSeasons,
				leagues: parsedLeagues,
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
	  	// console.log(this.state.weatherData.list);
	  	return(
	  		<React.Fragment>
      			Some BoxscoreContainer text.
      			<h2>A heading</h2>
    		</React.Fragment>
  		)
  	}

}

export default BoxscoreContainer
