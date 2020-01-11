import React from 'react';


// passing props from boxscore container
function SelectedDateSummary (props) {
	// console.log(props);
	
	//map needs to be passed an array, not an object.
	const selectedGames = props.selectedGames.map(game => {
		const byGameTotalsGameV = props.byGameTotals
			.find(totalsGame => totalsGame.api.statistics[0].gameId === game.gameId);
			
		const byGameTotalsGameH = props.byGameTotals
			.find(totalsGame => totalsGame.api.statistics[1].gameId === game.gameId);
			
	return(
			<li key={game.gameId}>
			    {game.vTeam.shortName + " "}
			    {game.vTeam.score.points + " "}
			    {game.currentPeriod === "4/4" ? "FINAL " : "FINAL/OT "}
			    {game.hTeam.score.points + " "}
			    {game.hTeam.shortName}
			</li>
	)})  

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