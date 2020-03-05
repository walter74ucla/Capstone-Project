import React from 'react';
import { Loader } from 'semantic-ui-react';


// passing props from boxscore container
function GameListToday (props) {
	// console.log(props);

	if (props.isLoading && props.todaysGames.length === 0) {
		return(
			<Loader active inline='centered' size='medium' content='loading' />
		)		
	} else if (!props.isLoading && props.todaysGames.length === 0) {
		return(
		    <React.Fragment>
		      <h4>Today's Games</h4>
		      <div>
		        No Games Scheduled
		      </div>
		    </React.Fragment>
	    )
	}

	//map needs to be passed an array, not an object.
	const todaysGames = props.todaysGames.map(game => (
		<li key={game.gameId}>
		    {game.vTeam.shortName} versus {game.hTeam.shortName}
		</li>

	))

	return(
	    <React.Fragment>
	      <h4>Today's Games</h4>
	      <ul>
	        {todaysGames}
	      </ul>
	    </React.Fragment>
    )

}


export default GameListToday;