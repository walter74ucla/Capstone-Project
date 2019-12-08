import React, { Component } from 'react';
import GameListToday from '../GameListToday';
import GameListSelectedDate from '../GameListSelectedDate';
import BoxscoreDataList from '../BoxscoreDataList';
// import DropdownExampleControlled from '../DateInputFormV1';
import DateInput from '../DatePicker';

	
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
	      	gameTotals: {// need to define all key-value pairs (properties) if you want to lift state
				api: {
		      		filters: [],
		      		statistics: [],
		      		message: "",
		      		results: 0,
		      		status: 0
		      	}
		   	},
		   	// This property is used in the fetch
		   	playerInfo: {// need to define all key-value pairs (properties) if you want to lift state
				api: {
		      		filters: [],
		      		statistics: [],
		      		message: "",
		      		results: 0,
		      		status: 0
		      	}
		   	},
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
		let dateString = new Date(game.startTimeUTC);
		// console.log(dateString);
		let fDSConverted = this.convertDateStr(filterDateString);
		// console.log(fDSConverted);
		//Adjust fDSConverted by 7 hours
		let fDSConvertedPlus7 = fDSConverted + "T07:00:00.00Z";
		// console.log(fDSConvertedPlus7);
		// "YYYY-MM-DDT07:00:00.00Z" -->07:00:00.00Z helps get the input date the correct day.
		// The 7 gets you to midnight Mountain Standard Time or 1am Mountain Daylight Time.  
		let updatedFDSCP7 = new Date(fDSConvertedPlus7);
		// console.log(fDSConvertedPlus7);
		let startTimeDayCheck = dateString.getDay();
		// console.log(startTimeDayCheck);
		let inputDay = updatedFDSCP7.getDay();
		// console.log(inputDay);
		if (expectEqual) {
			return startTimeDayCheck === inputDay
		} else {
			return startTimeDayCheck !== inputDay
		}
		
	}

	getSelectedDateGameData = async (day, today=false) => {
		// page defaults to today's date
		// when another date is selected update API call
		// console.log('TOOOOOOOOODAY', day);
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

			// console.log('Selected Day Games: ', selectedGames)

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
					// console.log('selectedGamesGameTotals in promiseall:', selectedGamesGameTotals)
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
					// console.log('selectedGamesPlayerInfo in promiseall:', selectedGamesPlayerInfo)
					// console.log(selectedGamesPlayerInfo[0].api.statistics[0].points);	
				})

			
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
	  	return(
	  		<React.Fragment>
      			Some BoxscoreContainer text.
      			<DateInput selectedDay={this.state.selectedDay}
      				inputDate={this.getInputDate}
      			/>
      			<GameListToday
      				todaysGames={this.state.todaysGames}
      			/>
      			<GameListSelectedDate
      				selectedGames={this.state.selectedGames}
      			/>
      			<BoxscoreDataList
      				selectedGames={this.state.selectedGames}
      				byGameTotals={this.state.gameTotalsByGame}
  					byGamePlayerInfo={this.state.playerInfoByGame}
      			/>
    		</React.Fragment>
  		)
  	}

}

export default BoxscoreContainer
