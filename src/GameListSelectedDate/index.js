import React from 'react';


// passing props from boxscore container
function GameListSelectedDate (props) {
	// console.log(props);
	
	//map needs to be passed an array, not an object.
	const selectedGames = props.selectedGames.map(game => (
		<li key={game.gameId}>
		    {game.vTeam.shortName} versus {game.hTeam.shortName}
		</li>

	))

	return(
	    <React.Fragment>
	      <h4>{props.selectedDay.toLocaleDateString()} Games</h4>
	      <ul>
	        {selectedGames}
	      </ul>
	    </React.Fragment>
    )

}


export default GameListSelectedDate;