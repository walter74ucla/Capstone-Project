import React from 'react';


// passing props from boxscore container
function GameList (props) {

	//map needs to be passed an array, not an object.
	const gameDateListItems = props.gameDate.map((gamesByDate) => {
		console.log(gamesByDate);
	// if ( FirstThreeLettersOf(new Date("YYYY-MM-DDT07:00:00.00Z")) === FirstThreeLettersOf(new Date("startTimeUTC")) ){ 
	// first three letters of is someVariable.slice(0,3) use those game id's} //YYYY-MM-DDT07:00:00.00Z" -->07:00:00.00Z 
	// helps get to input date the correct day.  The 7 gets you to midnight Mountain Standard Time or 1am Mountain Daylight Time. 
		let dateString = new Date(gamesByDate.startTimeUTC);
		console.log(dateString);
		// let todaysDate = new Date("2019-11-30T07:00:00.00Z")
		let date = new Date("2019-11-30T07:00:00.00Z");//"YYYY-MM-DDT07:00:00.00Z" -->07:00:00.00Z 
		// helps get to input date the correct day.  The 7 gets you to midnight Mountain Standard Time or 1am Mountain Daylight Time. 
		console.log(date);

		let startTimeDayCheck = dateString.getDay();
		console.log(startTimeDayCheck);

		let inputDate = date.getDay();
		console.log(inputDate);

		// console.log(dateString[0]);// why doesn't this work?
		// let dayCheck = dateString.slice(0,3);// why doesn't this work?
		// let today = todaysDate.slice(0,3);// why doesn't this work?

		if (startTimeDayCheck === inputDate) {
			return(
				<li key={gamesByDate.gameId}>
					{gamesByDate.vTeam.shortName} versus {gamesByDate.hTeam.shortName}
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
	      </ul>
	    </React.Fragment>
    )

}


export default GameList;