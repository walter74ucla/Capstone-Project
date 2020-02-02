import React, { Component, createRef } from 'react';
import GameListToday from '../GameListToday';
import GameListSelectedDate from '../GameListSelectedDate';
import GameInfo from '../GameInfo';
import SelectedDateSummary from '../SelectedDateSummary';
// import DropdownExampleControlled from '../DateInputFormV1';
import DateInput from '../DatePicker';
import { 
	Grid, 
	Segment, 
	Dimmer, 
	Loader, 
	Button, 
	Rail, 
	Ref, 
	Sticky 
} from 'semantic-ui-react';


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
	      	selectedDay: null, //added this here to get the selectedDay from the calendar
	      	isLoading: false, //need this to display loading alert
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
		console.log('SELECTEDDDDDDDAY', day);
		this.setState({
	      	selectedGames: [],
	      	gameTotalsByGame: [],
	      	playerInfoByGame: [],
	      	playerInfoByGameName: [],
	      	isLoading: true,
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
	      	const selectedDate = await 
	      		fetch(`https://api-nba-v1.p.rapidapi.com/games/date/${dSAPIConverted}`, {
					"method": "GET",
					"headers": {
						"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
						"x-rapidapi-key": "d6b3a2676dmsh79d3be25f7311bfp17de4ejsn779b55e60866"
					}
				})

			const selectedDatePlusOne = await 
				fetch(`https://api-nba-v1.p.rapidapi.com/games/date/${dSAPIPOConverted}`, {
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

			console.log('Selected Day Games: ', selectedGames);

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
				    isLoading: false,
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


  	render() {
	  	let today = new Date();
	  	// console.log(today);
	  	// console.log(this.state.selectedDay);
	  	return(
	  		<React.Fragment>
      			<Grid columns={3}>
				    <Grid.Row stretched>
				      	<Grid.Column>
				        	<Segment>
				        		<GameListToday todaysGames={this.state.todaysGames}/>
      						</Segment>
				      	</Grid.Column>
					   	<Grid.Column>
					        <Segment>
					        	<DateInput 
					        		selectedDay={this.state.selectedDay}
      								inputDate={this.getInputDate}
      							/>
					        </Segment>
					  	</Grid.Column>
				      	<Grid.Column>
				        	<Segment>
				        		{(this.state.selectedDay && 
				        			this.state.selectedDay.toLocaleDateString() === 
				        			today.toLocaleDateString() || 
				        			this.state.selectedDay > today)
				        			? 	<GameListSelectedDate
				      						selectedDay={this.state.selectedDay}
				      						selectedGames={this.state.selectedGames}
				      					/>
				      				: 	(this.state.selectedDay &&
				      						this.state.selectedDay.toLocaleDateString() !== 
				        					today.toLocaleDateString() &&  
				      						this.state.selectedGames.length &&
				      						this.state.selectedDay < today)
				      				? 	<SelectedDateSummary
						        			selectedDay={this.state.selectedDay}
						        			selectedGames={this.state.selectedGames}
						        			byGameTotals={this.state.gameTotalsByGame}
						        		/>
      								: null
      							}		
				        	</Segment>
				      	</Grid.Column>
				    </Grid.Row>
				</Grid>
      					
      			{this.state.selectedDay && this.state.isLoading === true
      				?	<Segment>
      						<Dimmer active inverted>
	        					<Loader inverted content='Loading' />
	      					</Dimmer>
	      				</Segment>
	      			: 	(this.state.selectedDay &&
	      					this.state.selectedDay.toLocaleDateString() !== 
				        	today.toLocaleDateString() &&
      						this.state.selectedGames.length &&
      						this.state.selectedDay < today)
      				?	<GameInfo
		      				selectedGames={this.state.selectedGames}
		      				byGameTotals={this.state.gameTotalsByGame}
		      				byGamePlayerInfo={this.state.playerInfoByGame}
		      				byGamePlayerInfoName={this.state.playerInfoByGameName}
		      			/>
		      		: null	
			    }
			    <Button content='Back to Top' color='blue' floated='right' />
    		</React.Fragment>
  		)
  	}

}

export default BoxscoreContainer;
