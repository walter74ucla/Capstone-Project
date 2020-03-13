import React from 'react';


// passing props from boxscore container
function SelectedDateSummary (props) {
	console.log(props);
	// console.log(props.selectedGames[0].vTeam.score.points);
	// console.log(props.byGameTotals[0].api.statistics.length);

	// if (props.byGameTotals[0].api.statistics.length === 0) {
		// return(
		// 	<React.Fragment>
		//       <h4>{props.selectedDay.toLocaleDateString()} Games</h4>
		//       <div>
		//         No Games Scheduled
		//       </div>
		//     </React.Fragment>
		// )	
	// } 

	if (props.gamesFinished.length === 0) {
			const selectedGames = props.selectedGames.map(game => {
				return(
					<li key={game.gameId}>
						{game.vTeam.shortName} versus {game.hTeam.shortName}, Postponed
					</li>
				)
			})
	// console.log(selectedGames);
		return(
		    <React.Fragment>
		      <h4>{props.selectedDay.toLocaleDateString()} Games</h4>
		      <ul>
		        {selectedGames}
		      </ul>
		    </React.Fragment>
	    )
	}

	// On Feb 15, 2020, the Skills Challenge, 3-Point Contest, and Slam Dunk
	// are considered a game in this API-NBA
	if (props.selectedGames[0].vTeam.teamId === null) {
		return(
			<React.Fragment>
		      <h4>{props.selectedDay.toLocaleDateString()} Games</h4>
		      <div>
		        No Games Scheduled
		      </div>
		    </React.Fragment>
		)
	}

			//map needs to be passed an array, not an object.
			const selectedGames = props.selectedGames.map(game => {
				const byGameTotalsGameV = props.byGameTotals
					.find(totalsGame => totalsGame.api.statistics[0].gameId === game.gameId);
					
				const byGameTotalsGameH = props.byGameTotals
					.find(totalsGame => totalsGame.api.statistics[1].gameId === game.gameId);
					
			return(
					game.startTimeUTC.length === 10
					?
					<li key={game.gameId}>
						{game.vTeam.shortName} versus {game.hTeam.shortName}, Postponed
					</li>
					:
					<li key={game.gameId}>
					    {game.vTeam.shortName + " "}
					    {game.vTeam.score.points + " "}
					    {game.currentPeriod === "4/4" ? "FINAL " : "FINAL/OT "}
					    {game.hTeam.score.points + " "}
					    {game.hTeam.shortName}
					</li>
			)})
	// else {
	// 	console.log('FFFFFFFFFYEAHYEAHYEAH...DUH!');
	// 	const selectedGames = props.selectedGames.map(game => {

	// 	return(
	// 		<li key={game.gameId}>No Games Scheduled</li>)	
	// 	});
	// 	console.log(selectedGames);
	// }
	  
	return(
	    <React.Fragment>
	      <h4>{props.selectedDay.toLocaleDateString()} Games</h4>
	      <ul>
	        {selectedGames}
	      </ul>
	    </React.Fragment>
    )

}


export default SelectedDateSummary;