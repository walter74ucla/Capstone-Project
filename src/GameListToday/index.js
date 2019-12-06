import React from 'react';


// passing props from boxscore container
function GameListToday (props) {

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