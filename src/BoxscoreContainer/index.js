import React, { Component } from 'react';
import GameListToday from '../GameListToday';
import GameListSelectedDate from '../GameListSelectedDate';
// import GameTotalsList from '../GameTotals';
// import DropdownExampleControlled from '../DateInputFormV1';
import DateInput from '../DatePicker';

	
class BoxscoreContainer extends Component {
	constructor() {
		super();
		// this is the initial "state" of our boxscore object
	 	// this is mimicking the structure of our API information. 
	    this.state = {
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
	      gameTotals: {// need to define all key-value pairs (properties) if you want to lift state
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
	
	convertDateStr = (dateString) => {// this function converts a date string to YYYY-MM-DD
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

	getTodaysGameData = async () => {
		// page defaults to today's date
		// when another date is selected update API call
		
		// Get today's date
		let dateStringAPI = new Date();//today
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
			// the endpoint is the url we are making our request to.
	      	// fetch is a native js function that makes http requests
	      	// by default it makes a get request
	      	// we use fetch when we don't want to refresh the page
	      	const today = await fetch(`https://api-nba-v1.p.rapidapi.com/games/date/${dSAPIConverted}`, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
					"x-rapidapi-key": "d6b3a2676dmsh79d3be25f7311bfp17de4ejsn779b55e60866"
				}
			})

			const todayPlusOne = await fetch(`https://api-nba-v1.p.rapidapi.com/games/date/${dSAPIPOConverted}`, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
					"x-rapidapi-key": "d6b3a2676dmsh79d3be25f7311bfp17de4ejsn779b55e60866"
				}
			})

			// our response will be in the form of JSON, a string
	      	// data is sent across the internet as JSON
	      	// parse the JSON is turning the string into objects
	      	const parsedToday = await today.json();
	      	const parsedTodayPlusOne = await todayPlusOne.json();
			// we should always log out the response before we 
	      	// write any other code!
	      	// console logging the parsed data did not work until creating the componentDidMount() method
			// console.log(parsedToday);
			// console.log(parsedTodayPlusOne);
			
			this.setState({
				today: parsedToday,
				todayPlusOne: parsedTodayPlusOne,
				tInputDate: dateStringAPI,
				tInputDatePlusOne: dateStringAPIPlusOne,
			})
			console.log(this.state);
			console.log(this.state.today.api.games[0].gameId);
		} catch(err){
			console.log(err);
		}
		
	}	

	getGameTotalsDataForOneGame = async (gameId) => {
		console.log('GameID: ', gameId);

		try {														//need to make this gameId variable
			const gameTotals = await fetch('https://api-nba-v1.p.rapidapi.com/statistics/games/gameId/' + gameId, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
					"x-rapidapi-key": "d6b3a2676dmsh79d3be25f7311bfp17de4ejsn779b55e60866"
				}
			})

		const parsedGameTotals = await gameTotals.json();
		console.log(parsedGameTotals);
		
		this.setState({
			gameTotals: parsedGameTotals,
		})
		console.log(this.state);	

		} catch(err) {
			console.log(err);
		}

	}

	getSelectedDateGameData = async (day) => {
		// page defaults to today's date
		// when another date is selected update API call
		// console.log(day);
		// Get selected day's date
		let dateStringAPI = new Date(day);//selected day
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
			
			this.setState({
				selectedDate: parsedSelectedDate,
				selectedDatePlusOne: parsedSelectedDatePlusOne,
				sInputDate: dateStringAPI,
				sInputDatePlusOne: dateStringAPIPlusOne,
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
    	this.getTodaysGameData()
    
  	}

  	getInputDate = (day, selected) => {
	    // e.preventDefault();
	    // console.log('Lifted day', day)
    	 this.setState({
	      selectedDay: selected ? undefined : day,
	    });
    	this.getSelectedDateGameData(day)
    }

  	render() {
	  	// console.log(this.state.today.api.games);
	  	// console.log(this.state.todayPlusOne.api.games);
	  	// console.log(this.state.tInputDate);
	  	// console.log(this.state.tInputDatePlusOne);
	  	return(
	  		<React.Fragment>
      			Some BoxscoreContainer text.
      			<DateInput selectedDay={this.state.selectedDay} inputDate={this.getInputDate}/>
      			<GameListToday
      				getGame={this.getGameTotalsDataForOneGame}
      				gameDate={this.state.today.api.games}
      				gameDatePlusOne={this.state.todayPlusOne.api.games}
      				inputDate={this.state.tInputDate}
      				inputDatePlusOne={this.state.tInputDatePlusOne}
      				convertDateToString={this.convertDateStr}
      			/>
      			<GameListSelectedDate
      				getGame={this.getGameTotalsDataForOneGame}
      				gameDate={this.state.selectedDate.api.games}
      				gameDatePlusOne={this.state.selectedDatePlusOne.api.games}
      				inputDate={this.state.sInputDate}
      				inputDatePlusOne={this.state.sInputDatePlusOne}
      				convertDateToString={this.convertDateStr}
      			/>
      			{/*<GameTotalsList
      				gameDate={this.state.today.api.games}
      				gameDatePlusOne={this.state.todayPlusOne.api.games}
      				getGameTotalsDataForOneGame={this.getGameTotalsDataForOneGame}
      			/>*/}
    		</React.Fragment>
  		)
  	}

}

export default BoxscoreContainer
