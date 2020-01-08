import React, { Component } from 'react';
import GameListToday from '../GameListToday';
import GameListSelectedDate from '../GameListSelectedDate';
import GameInfo from '../GameInfo';
import GameTotals from '../GameTotals';
import PlayerInfo from '../PlayerInfo';
import FavoriteTeamsList from '../FavoriteTeamsList';
import Login from '../Login';
// import DropdownExampleControlled from '../DateInputFormV1';
import DateInput from '../DatePicker';
import { Header, Container, Menu, Button } from 'semantic-ui-react'


class BoxscoreContainer extends Component {
	constructor() {
		super();
		// this is the initial "state" of our boxscore object
	 	// this is mimicking the structure of our API information. 
	    this.state = {
	    	todaysGames: [], //added this to dry the code
	      	selectedGames: [], //added this to dry the code
	      	gameTotalsByGame: [], //receiving fetched data from the Promise.all
	      	playerInfoByGame: [], //receiving fetched data from the Promise.all
	      	playerInfoByGameName: [], //receiving fetched data from the Promise.all
	      	favoriteTeams: [],//this comes from the flask server
	      	selectedDay: null, //added this here to get the selectedDay from the calendar
	      	today: {// need to define all key-value pairs (properties) if you want to lift state
		      	api: {
		      		filters: [],
		      		games: [],
		      		message: "",
		      		results: 0,
		      		status: 0
		      	}
	      	},
	      	todayPlusOne: {// need to define all key-value pairs (properties) if you want to lift state
		      	api: {
		      		filters: [],
		      		games: [],
		      		message: "",
		      		results: 0,
		      		status: 0
		      	}
		    },
		    selectedDate: {// need to define all key-value pairs (properties) if you want to lift state
		      	api: {
		      		filters: [],
		      		games: [],
		      		message: "",
		      		results: 0,
		      		status: 0
		      	}
		    },
		    selectedDatePlusOne: {// need to define all key-value pairs (properties) if you want to lift state
		      	api: {
		      		filters: [],
		      		games: [],
		      		message: "",
		      		results: 0,
		      		status: 0
		      	}
		    },
		    // This property is used in the fetch
	   //    	gameTotals: {// need to define all key-value pairs (properties) if you want to lift state
				// api: {
		  //     		filters: [],
		  //     		statistics: [],
		  //     		message: "",
		  //     		results: 0,
		  //     		status: 0
		  //     	}
		  //  	},
		   	// This property is used in the fetch
		  //  	playerInfo: {// need to define all key-value pairs (properties) if you want to lift state
				// api: {
		  //     		filters: [],
		  //     		statistics: [],
		  //     		message: "",
		  //     		results: 0,
		  //     		status: 0
		  //     	}
		  //  	},
		  //  	playerStats: {// need to define all key-value pairs (properties) if you want to lift state
				// api: {
		  //     		filters: [],
		  //     		statistics: [],
		  //     		message: "",
		  //     		results: 0,
		  //     		status: 0
		  //     	}
		  //  	},
		}
	}
	
	// this function converts a date string to YYYY-MM-DD
	convertDateStr = (dateString) => {
		let inputDateYear = dateString.getFullYear();//Get the year as a four digit number (yyyy)
		// console.log(inputDateYear);
		
		let inputDateMonth = dateString.getMonth() + 1;//Get the month as a number (0-11)
		// console.log(typeof inputDateMonth);//number
		let iDMStr = inputDateMonth.toString();
		// console.log(iDMStr.length);
		if(iDMStr.length === 1){
			inputDateMonth = "0" + iDMStr
			// console.log(inputDateMonth)
		} else {
			inputDateMonth = iDMStr
			// console.log(inputDateMonth)
		}

		let inputDateDay = dateString.getDate();//Get the day as a number (1-31)
		let iDDStr = inputDateDay.toString();
		if(iDDStr.length === 1){
			inputDateDay = "0" + iDDStr
			// console.log(inputDateDay)
		} else {
			inputDateDay = iDDStr
			// console.log(inputDateDay)
		}

		let inputDate = inputDateYear + "-" + inputDateMonth + "-" + inputDateDay
		// console.log(inputDate);

		return inputDate
		
	};

	// This function gives us the correct day's information due to the strange UTC time stuff
	correctDayFilter = (game, filterDateString, expectEqual) => {
		let dateStringStartTime = new Date(game.startTimeUTC);
		// console.log(dateStringStartTime);
		let localeDateStringStartTime = dateStringStartTime.toLocaleDateString();
		// console.log(localeDateStringStartTime);

		let dateStringSelectedDay = new Date(filterDateString);
		// console.log(dateStringSelectedDay);
		let localeDateStringSelectedDay = dateStringSelectedDay.toLocaleDateString();
		// console.log(localeDateStringSelectedDay);		

		if (expectEqual) {
			return localeDateStringStartTime === localeDateStringSelectedDay
		} else {
			return localeDateStringStartTime !== localeDateStringSelectedDay
		}
		
	}

	getSelectedDateGameData = async (day, today=false) => {
		// page defaults to today's date
		// when another date is selected update API call
		console.log('TOOOOOOOOODAY', day);
		this.setState({
	      	selectedGames: [],
	      	gameTotalsByGame: [],
	      	playerInfoByGame: [],
	      	playerInfoByGameName: [],
	    })

		let dateStringAPI;
		if (today) {
			dateStringAPI = new Date();//today
		} else {
			dateStringAPI = new Date(day);//selected day
		}

		let dSAPIConverted = this.convertDateStr(dateStringAPI);
		// console.log(dSAPIConverted);

		// Add 1 day to dateStringAPI
		let time = dateStringAPI.getTime(); //Get the time (milliseconds since January 1, 1970)
		// console.log(time);
		let oneDay = 1000*60*60*24; //1000 milliseconds times 60 seconds times 60 minutes times 24 hours 
		// console.log(oneDay);
		let timePlusOne = time + oneDay;
		// console.log(timePlusOne);
		let dateStringAPIPlusOne = new Date(timePlusOne);
		// console.log(dateStringAPIPlusOne);
		let dSAPIPOConverted = this.convertDateStr(dateStringAPIPlusOne);
		// console.log(dSAPIPOConverted);
		

		try {
	      	const selectedDate = await fetch(`https://api-nba-v1.p.rapidapi.com/games/date/${dSAPIConverted}`, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
					"x-rapidapi-key": "d6b3a2676dmsh79d3be25f7311bfp17de4ejsn779b55e60866"
				}
			})

			const selectedDatePlusOne = await fetch(`https://api-nba-v1.p.rapidapi.com/games/date/${dSAPIPOConverted}`, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
					"x-rapidapi-key": "d6b3a2676dmsh79d3be25f7311bfp17de4ejsn779b55e60866"
				}
			})

	      	const parsedSelectedDate = await selectedDate.json();
	      	const parsedSelectedDatePlusOne = await selectedDatePlusOne.json();
	      	// console.log(parsedSelectedDate);
			// console.log(parsedSelectedDatePlusOne);
	      	
			// This creates a selected games array
	      	const selectedGames = parsedSelectedDate.api.games.filter((game) => {
	      		// Filter for select dates games return games corrected for timezone 
				return this.correctDayFilter(game, dateStringAPI, true);
			}).concat(parsedSelectedDatePlusOne.api.games.filter((game) => {
				// Filter for selected date by correcting timezone of day plus one
				return this.correctDayFilter(game, dateStringAPIPlusOne, false);
			}));

			console.log('Selected Day Games: ', selectedGames)

			//Fill the gameTotalsByGame array here
			let selectedGamesGameTotals
			await Promise.all(selectedGames.map(game => {
				// console.log('Fetching:', game.gameId)
				let gameTotals = this.getGameTotalsDataForOneGame(game.gameId);
				return gameTotals;
				})).then(values => {
					let selectedGamesGameTotals = values;
					this.setState({
				      gameTotalsByGame: selectedGamesGameTotals,
				    })
					// console.log('selectedGamesGameTotals in promiseall:', selectedGamesGameTotals);
					// console.log(selectedGamesGameTotals[0].api.statistics[0].assists);	
				})
			
			//Fill the playerInfoByGame array here
			let selectedGamesPlayerInfo
			await Promise.all(selectedGames.map(game => {
				// console.log('Fetching:', game.gameId)
				let playerInfo = this.getPlayerInfoForOneGame(game.gameId);
				return playerInfo;
				})).then(values => {
					let selectedGamesPlayerInfo = values;
					this.setState({
				      playerInfoByGame: selectedGamesPlayerInfo,
				    })
					// console.log('selectedGamesPlayerInfo in promiseall:', selectedGamesPlayerInfo);
					// console.log(selectedGamesPlayerInfo[0].api.statistics.length);
				})

			// Fill the playerInfoByGameName array here
			// console.log(this.state.playerInfoByGame);
			// want the game to be finished before getting player name
			
			if (selectedGames.length > 0) {
				let checkIfGameFinished = selectedGames.map(gameStatus => {
					return gameStatus.statusGame;
				})
				console.log(checkIfGameFinished);

				let check = checkIfGameFinished.map(gameStatus => {
					return gameStatus === "Finished" ? 0 : 1;
					}).reduce((sum, gameStatus) => {
						return sum + gameStatus;
					});
					console.log(check);

				if (check === 0) {
					let multipleGames = [];
					for (let i=0; i<this.state.playerInfoByGame.length; i++){
						let playerNamesForOneGame
							await Promise.all(this.state.playerInfoByGame[i].api.statistics.map(player => {
							// console.log('Player is: ', player);
							// console.log('Fetching:', player.playerId)
							let playerName = this.getPlayerName(player.playerId);
							return playerName;
							})).then(values => {
								let playerNamesForOneGame = values;
								this.setState({
							      playerInfoByGameName: playerNamesForOneGame,
							    })	
								// console.log('playerNamesForOneGame in promiseall:', playerNamesForOneGame);
								console.log(playerNamesForOneGame[0].api.players[0].lastName);
							})
							
							multipleGames[i] = this.state.playerInfoByGameName;
							this.setState({
							      playerInfoByGameName: multipleGames,
							    })
							// console.log(multipleGames);	
					}
						
				}
			}
					

			if (today) {
				this.setState({
					todaysGames: selectedGames,
					today: parsedSelectedDate,
					todayPlusOne: parsedSelectedDatePlusOne,
					tInputDate: dateStringAPI,
					tInputDatePlusOne: dateStringAPIPlusOne,
				})
			} else {
                this.setState({
                	selectedGames: selectedGames,
				    selectedDate: parsedSelectedDate,
				    selectedDatePlusOne: parsedSelectedDatePlusOne,
				    sInputDate: dateStringAPI,
				    sInputDatePlusOne: dateStringAPIPlusOne,
			 	})
			}
			
			console.log(this.state);
		} catch(err){
			console.log(err);
		}
		
	}	



	getGameTotalsDataForOneGame = async (gameId) => {
		// console.log('GameID: ', gameId);

		try {														
			const gameTotals = await fetch('https://api-nba-v1.p.rapidapi.com/statistics/games/gameId/' + gameId, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
					"x-rapidapi-key": "d6b3a2676dmsh79d3be25f7311bfp17de4ejsn779b55e60866"
				}
			})

		const parsedGameTotals = await gameTotals.json();
		// console.log(parsedGameTotals);	
		return parsedGameTotals;

		} catch(err) {
			console.log(err);
		}

	}

	getPlayerInfoForOneGame = async (gameId) => {
		// console.log('GameID: ', gameId);

		try {														
			const playersByGame = await fetch('https://api-nba-v1.p.rapidapi.com/statistics/players/gameId/' + gameId, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
					"x-rapidapi-key": "d6b3a2676dmsh79d3be25f7311bfp17de4ejsn779b55e60866"
				}
			})

		const parsedPlayersByGame = await playersByGame.json();
		// console.log(parsedPlayersByGame);	
		return parsedPlayersByGame;

		} catch(err) {
			console.log(err);
		}

	}

	getPlayerName = async (playerId) => {
		// console.log('PlayerID: ', playerId);

		try {														
			const playerName = await fetch('https://api-nba-v1.p.rapidapi.com/players/playerId/' + playerId, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
					"x-rapidapi-key": "d6b3a2676dmsh79d3be25f7311bfp17de4ejsn779b55e60866"
				}
			})

		const parsedPlayerName = await playerName.json();
		// console.log(parsedPlayerName);
		return parsedPlayerName;

		} catch(err) {
			console.log(err);
		}

	}

	createName = (playerId, playerArray) => {
	    // let nameArray = playerArray;
	    for(let i=0; i<playerArray.length; i++){
	    	for(let j=0; j<playerArray[i][j].length; j++){
	    		if(playerId === playerArray[i][j].api.players[0].playerId){
	    			let firstName = playerArray[i][j].api.players[0].firstName;
	    			let lastName = playerArray[i][j].api.players[0].lastName;
	    			let fullName = `${lastName}, ${firstName}`;
	    			return fullName;
	    		}
	    	}
	    }
    }
	// getPlayerNamesForOneGame = async (player, i) => {
	// 	let playerNamesForOneGame
	// 		await Promise.all(this.state.playerInfoByGame[i].api.statistics.map(player => {
	// 			console.log('Player is: ', player);
	// 			console.log('Fetching:', player.playerId)
	// 			let playerName = this.getPlayerName(player.playerId);
	// 			return playerName;
	// 			})).then(values => {
	// 				let playerNamesForOneGame = values;
	// 				console.log('playerNamesForOneGame in promiseall:', playerNamesForOneGame);
	// 				console.log(playerNamesForOneGame[0].api.players[0].lastName);
	// 			})
	// }



	componentDidMount(){
    // get called once, after the initial render
    // is the component on the dom? ComponentDidMount
    // any calls to an external data source that we want connected
    // as soon as our app is loaded we call it in componentDidMount
    	this.getSelectedDateGameData(null, true)
    
  	}

  	getInputDate = (day, selected) => {
	    // e.preventDefault();
	    // console.log('Lifted day', day)
    	 this.setState({
	      selectedDay: selected ? undefined : day,
	    });
    	this.getSelectedDateGameData(day, false)
    }

    // Getting logged in user favorite teams from the flask server
    getFavoriteTeams = async () => {

		try {
			const favoriteTeams = await fetch(process.env.REACT_APP_API_URL + '/api/v1/favorite_teams/',
				{ // added this callback to send over the session cookie
					credentials: 'include',
					method: "GET"
				});
			const parsedfavoriteTeams = await favoriteTeams.json();
			console.log(parsedfavoriteTeams);

			this.setState({
				favoriteTeams: parsedfavoriteTeams.data
			})
		
	} catch(err){
		console.log(err);
		}
	}

	deleteFavoriteTeam = async (id) => {

		console.log(id)
		const deleteFavoriteTeamResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/favorite_teams/' + id + '/', {// strange + '/' CORS error again
													method: 'DELETE',
													credentials: 'include' // Send a session cookie along with our request
												});
		const deleteFavoriteTeamParsed = await deleteFavoriteTeamResponse.json();
		console.log(deleteFavoriteTeamResponse)
		if (deleteFavoriteTeamParsed.status.code === 200) {
			// now that the db has deleted our item, we need to remove it from state
			this.setState({favoriteTeams: this.state.favoriteTeams.filter((favoriteTeam) => favoriteTeam.id !== id )})

		} else {
			alert ("You cannot delete a Favorite Team that you did not create")
		}

		console.log(deleteFavoriteTeamParsed, ' response from Flask server')
			// then make the delete request, then remove the favorite team from the state array using filter
			// what about handling multiple delete requests at once?

	}

	addFavoriteTeam = async (e, favoriteTeam) => {
		e.preventDefault();
		console.log(favoriteTeam);

		try {

			// Send JSON
			// createdIssue variable storing response from Flask API
			const createdFavoriteTeamResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/favorite_teams/', {
				method: 'POST',
				credentials: 'include', // added this to send over the session cookie
				body: JSON.stringify(favoriteTeam),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
			// turn the response from Flask into an object we can use
			const parsedResponse = await createdFavoriteTeamResponse.json();
			console.log(parsedResponse, ' this is response');

			// empty all issues in state to new array then
			// adding issue we created to the end of it (created shows up first until refresh then at the bottom)
			// what about handling multiple add requests at once?

			this.setState({favoriteTeams: [parsedResponse.data, ...this.state.favoriteTeams]})
		
		} catch(err){
			console.log('error')
			console.log(err)
		}
	}


  	render() {
  		// console.log(this.state.selectedDate.api.games[0].statusGame);//Fix This
	  	let today = new Date();
	  	// console.log(today);
	  	// console.log(this.state.selectedDay);
	  	return(
	  		<React.Fragment>
      			<DateInput selectedDay={this.state.selectedDay}
      				inputDate={this.getInputDate}
      			/>
      			<GameListToday
      				todaysGames={this.state.todaysGames}
      			/>
      			{/* if selected day is greater today, show selected day game list*/}
      			{/* OR if selected day = today, show selected day game list*/}
      			{this.state.selectedDay > today || this.state.selectedDay == today
      				? 	<GameListSelectedDate
      						selectedGames={this.state.selectedGames}
      					/>
      				: null
      			}		
      			{this.state.selectedDay < today && this.state.selectedGames.length
      				?	
      					<GameInfo
		      				selectedGames={this.state.selectedGames}
		      				byGameTotals={this.state.gameTotalsByGame}
		      				byGamePlayerInfo={this.state.playerInfoByGame}
		      				byGamePlayerInfoName={this.state.playerInfoByGameName}
		      				createFullName={this.createName}
		      			/>
		      		: null
		      			// <GameTotals
      					// 	byGameTotals={this.state.gameTotalsByGame}
      					// />
      					// <PlayerInfo
		      			// 	byGamePlayerInfo={this.state.playerInfoByGame}
		      			// />	
			    }

      			
      			{/*//if this game is over, then do this...*/}
      			{/*{this.state.selectedGames.length 
      				? <React.Fragment>	
	      					<GameInfo
			      				selectedGames={this.state.selectedGames}
			      				byGameTotals={this.state.gameTotalsByGame}
			      				byGamePlayerInfo={this.state.playerInfoByGame}
			      			/>
			      			{/*<GameTotals
	      						byGameTotals={this.state.gameTotalsByGame}
	      					/>
	      					<PlayerInfo
			      				byGamePlayerInfo={this.state.playerInfoByGame}
			      			/>
			      			</React.Fragment>
      				: null }*/}

      			<FavoriteTeamsList
      				favoriteTeams={this.state.favoriteTeams}
      			/>
    		</React.Fragment>
  		)
  	}

}

export default BoxscoreContainer
