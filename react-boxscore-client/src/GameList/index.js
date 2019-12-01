import React from 'react';


// passing props from boxscore container
function GameList (props) {

	//map needs to be passed an array, not an object.
	const gameDateListItems = props.gameDate.map((gamesByDate) => {
		console.log(gamesByDate);
	
		let dateString = new Date(gamesByDate.startTimeUTC);
		console.log(dateString);
		
		let inputDate = new Date("2019-11-30T07:00:00.00Z");
		// Gotta figure out a way to make the stuff in the Date() variable
		// "YYYY-MM-DDT07:00:00.00Z" -->07:00:00.00Z helps get the input date the correct day.
		// The 7 gets you to midnight Mountain Standard Time or 1am Mountain Daylight Time. 
		console.log(inputDate);

		let startTimeDayCheck = dateString.getDay();
		console.log(startTimeDayCheck);

		let inputDay = inputDate.getDay();
		console.log(inputDay);

		// console.log(dateString[0]);// why doesn't this work?
		// let dayCheck = dateString.slice(0,3);// why doesn't this work?
		// let today = todaysDate.slice(0,3);// why doesn't this work?

		if (startTimeDayCheck === inputDay) {
			return(
				<li key={gamesByDate.gameId}>
					{gamesByDate.vTeam.shortName} versus {gamesByDate.hTeam.shortName}
				</li>

			)
		} else {
			return false
		}

	})

	//map needs to be passed an array, not an object.
	const gameDatePlusOneListItems = props.gameDatePlusOne.map((gamesByDatePlusOne) => {
		console.log(gamesByDatePlusOne);
	
		let dateStringPlusOne = new Date(gamesByDatePlusOne.startTimeUTC);
		console.log(dateStringPlusOne);
		
		let inputDate = new Date("2019-11-30T07:00:00.00Z");
		// Gotta figure out a way to make the stuff in the Date() variable
		// "YYYY-MM-DDT07:00:00.00Z" -->07:00:00.00Z helps get the input date the correct day.
		// The 7 gets you to midnight Mountain Standard Time or 1am Mountain Daylight Time. 
		console.log(inputDate);

		let startTimeDayPlusOneCheck = dateStringPlusOne.getDay();
		console.log(startTimeDayPlusOneCheck);

		let inputDay = inputDate.getDay();
		console.log(inputDay);

		if (startTimeDayPlusOneCheck === inputDay) {
			return(
				<li key={gamesByDatePlusOne.gameId}>
					{gamesByDatePlusOne.vTeam.shortName} versus {gamesByDatePlusOne.hTeam.shortName}
				</li>

			)
		} else {
			return false
		}
		
	})

	return(
	    <React.Fragment>
	      <h4>Today's Games</h4>
	      <ul>
	        { gameDateListItems }
	        { gameDatePlusOneListItems }
	      </ul>
	    </React.Fragment>
    )

}


export default GameList;