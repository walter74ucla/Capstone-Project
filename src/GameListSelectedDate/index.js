import React from 'react';
import { Loader } from 'semantic-ui-react';

// passing props from boxscore container
function GameListSelectedDate (props) {
	// console.log(props);
	
	if (props.isLoading) {
		return(
			<Loader active inline='centered' size='medium' content='loading' />
		)		
	} else if (!props.isLoading && props.selectedGames.length === 0) {
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
	const selectedGames = props.selectedGames.map(game => (
		<li key={game.gameId}>
		    {game.vTeam.shortName} versus {game.hTeam.shortName}
		</li>

	))
	console.log(selectedGames);

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