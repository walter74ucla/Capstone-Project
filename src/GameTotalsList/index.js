import React from 'react';


// passing props from boxscore container
function GameTotalsList (props) {
	
	//map needs to be passed an array, not an object.
	let selectedGamesGameTotals
	// console.log(props.selectedGames);
	if (props.selectedGames.length === 0) {
		return null
	} else {
		Promise.all(props.selectedGames.map(game => {
		// console.log('Fetching:', game.gameId)
		let gameTotals = props.getGame(game.gameId);
		return gameTotals;
		})).then(values => {
			let selectedGamesGameTotals = values;
			console.log('selectedGamesGameTotals in promiseall:', selectedGamesGameTotals)
		})
		// console.log(selectedGamesGameTotals)
	}
	
	

	return(
	    <React.Fragment>
	      <h4>Game Totals List</h4>
	      <ul>
	        {}
	      </ul>
	    </React.Fragment>
    )

}


export default GameTotalsList;