import React, { Component } from 'react';
import GameList from '../GameList';
// import DropdownExampleControlled from '../DateInputFormV1';
import DateInput from '../DateInputForm';

class BoxscoreContainer extends Component {
	constructor() {
		super();
		// this is the initial "state" of our boxscore object
	 	// this is mimicking the structure of our API information. 
	    this.state = {
	      selectedDay: null, //added this here to get the selectedDay from the calendar
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
	
	getInputDate = (day, selected) => {
	    // e.preventDefault();
	    console.log('Lifted day', day)
    	 this.setState({
	      selectedDay: selected ? undefined : day,
	    });
    }

	getBoxscoreData = async (day) => {
		// page defaults to today's date
		// when another date is selected update API call
		
		// Today's date conversion: 1) Get today's date 2) Adjust it by 7 hours
		let dateString = new Date();
		let inputDateYear = dateString.getFullYear();//Get the year as a four digit number (yyyy)
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
		console.log(inputDate);
		
		let inputDatePlus7 = inputDate + "T07:00:00.00Z";
		console.log(inputDatePlus7);
		// "YYYY-MM-DDT07:00:00.00Z" -->07:00:00.00Z helps get the input date the correct day.
		// The 7 gets you to midnight Mountain Standard Time or 1am Mountain Daylight Time. 
		// console.log(inputDate);

		let dateStringAPI = new Date(inputDatePlus7);
		let inputDateYearAPI = dateStringAPI.getFullYear();//Get the year as a four digit number (yyyy)
		let inputDateMonthAPI = dateStringAPI.getMonth() + 1;//Get the month as a number (0-11)
		// console.log(typeof inputDateMonthAPI);//number
		let iDMAPIStr = inputDateMonthAPI.toString();
		// console.log(iDMAPIStr.length);
		if(iDMAPIStr.length === 1){
			inputDateMonthAPI = "0" + iDMAPIStr
			// console.log(inputDateMonthAPI)
		} else {
			inputDateMonthAPI = iDMAPIStr
			// console.log(inputDateMonthAPI)
		}

		let inputDateDayAPI = dateStringAPI.getDate();//Get the day as a number (1-31)
		let iDDAPIStr = inputDateDayAPI.toString();
		if(iDDAPIStr.length === 1){
			inputDateDayAPI = "0" + iDDAPIStr
			// console.log(inputDateDayAPI)
		} else {
			inputDateDayAPI = iDDAPIStr
			// console.log(inputDateDayAPI)
		}

		let inputDateAPI = inputDateYearAPI + "-" + inputDateMonthAPI + "-" + inputDateDayAPI
		console.log(inputDateAPI);

		//figure out how to add 1 day to inputDateAPI

		try {
			// the endpoint is the url we are making our request to.
	      	// fetch is a native js function that makes http requests
	      	// by default it makes a get request
	      	// we use fetch when we don't want to refresh the page
	      	const date = await fetch(`https://api-nba-v1.p.rapidapi.com/games/date/${inputDateAPI}`, {
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
      			<DateInput selectedDay={this.state.selectedDay} inputDate={this.getInputDate}/>
      			<GameList 
      				gameDate={this.state.date.api.games}
      				gameDatePlusOne={this.state.datePlusOne.api.games}
      			/>
    		</React.Fragment>
  		)
  	}

}

export default BoxscoreContainer
