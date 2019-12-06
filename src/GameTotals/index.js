// get the game id's from the selected games
// make api calls based on the game id's

import React, { Component } from 'react';


class GameTotals extends Component {
	constructor() {
		super();
		this.state = {
			gameId: {//figure out a way to get this gameId from the Selected Games by Date
				api: {
		      		filters: [],
		      		statistics: [],
		      		message: "",
		      		results: 0,
		      		status: 0
		      	},
			}
		}
	}

	getGameTotalsData = async () => {
		try {														//need to make this gameId variable
			const gameId = await fetch("https://api-nba-v1.p.rapidapi.com/statistics/games/gameId/6695", {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
					"x-rapidapi-key": "d6b3a2676dmsh79d3be25f7311bfp17de4ejsn779b55e60866"
				}
			})

		const parsedGameId = await gameId.json();
		console.log(parsedGameId);
		
		this.setState({
			gameId: parsedGameId,
		})
		console.log(this.state);	

		} catch(err) {
			console.log(err);
		}

	}

	componentDidMount(){
    	this.getGameTotalsData()
    
  	}

  	render() {
	  	return(
	  		<React.Fragment>
      			GameTotals Data
      			
    		</React.Fragment>
  		)
  	}
}


export default GameTotals