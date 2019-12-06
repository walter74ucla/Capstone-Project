import React from 'react';


// passing props from boxscore container
function GameListSelectedDate (props) {

	//map needs to be passed an array, not an object.
	const gameDateListItems = props.gameDate.map((gamesByDate) => {
		// console.log(gamesByDate);
	
		let dateString = new Date(gamesByDate.startTimeUTC);
		// console.log(dateString);
		
		// let inputDate = new Date("2019-11-30T07:00:00.00Z");
		let inputDate = props.inputDate;
		// console.log(inputDate);
		//Adjust inputDate by 7 hours
		let iDConverted = props.convertDateToString(inputDate);
		// console.log(iDConverted);
		let iDCPlus7 = iDConverted + "T07:00:00.00Z";
		// console.log(iDCPlus7);
		// "YYYY-MM-DDT07:00:00.00Z" -->07:00:00.00Z helps get the input date the correct day.
		// The 7 gets you to midnight Mountain Standard Time or 1am Mountain Daylight Time. 
		let updatedInputDate = new Date(iDCPlus7);
		// console.log(updatedInputDate);
		let startTimeDayCheck = dateString.getDay();
		// console.log(startTimeDayCheck);

		let inputDay = updatedInputDate.getDay();
		// console.log(inputDay);

		// console.log(dateString[0]);// why doesn't this work?
		// let dayCheck = dateString.slice(0,3);// why doesn't this work?
		// let today = todaysDate.slice(0,3);// why doesn't this work?

		if (startTimeDayCheck === inputDay) {
			return(
				<li key={gamesByDate.gameId} onClick={() => props.getGame(gamesByDate.gameId)}>
					{gamesByDate.vTeam.shortName} versus {gamesByDate.hTeam.shortName}
				</li>

			)
		} else {
			return false
		}

	})

	//map needs to be passed an array, not an object.
	const gameDatePlusOneListItems = props.gameDatePlusOne.map((gamesByDatePlusOne) => {
		// console.log(gamesByDatePlusOne);
	
		let dateStringPlusOne = new Date(gamesByDatePlusOne.startTimeUTC);
		// console.log(dateStringPlusOne);
		
		let inputDate = props.inputDatePlusOne;
		// console.log(inputDate);
		//Adjust inputDate by 7 hours
		let iDConverted = props.convertDateToString(inputDate);
		// console.log(iDConverted);
		let iDCPlus7 = iDConverted + "T07:00:00.00Z";
		// console.log(iDCPlus7);
		// "YYYY-MM-DDT07:00:00.00Z" -->07:00:00.00Z helps get the input date the correct day.
		// The 7 gets you to midnight Mountain Standard Time or 1am Mountain Daylight Time. 
		let updatedInputDate = new Date(iDCPlus7);
		// console.log(updatedInputDate);
		let startTimeDayPlusOneCheck = dateStringPlusOne.getDay();
		// console.log(startTimeDayPlusOneCheck);

		let inputDay = updatedInputDate.getDay();
		// console.log(inputDay);

		if (startTimeDayPlusOneCheck !== inputDay) {
			return(
				<li key={gamesByDatePlusOne.gameId} onClick={() => props.getGame(gamesByDatePlusOne.gameId)}>
					{gamesByDatePlusOne.vTeam.shortName} versus {gamesByDatePlusOne.hTeam.shortName}
				</li>

			)
		} else {
			return false
		}
		
	})

	return(
	    <React.Fragment>
	      <h4>Selected Days's Games</h4>
	      <ul>
	        { gameDateListItems }
	        { gameDatePlusOneListItems }
	      </ul>
	    </React.Fragment>
    )

}


export default GameListSelectedDate;