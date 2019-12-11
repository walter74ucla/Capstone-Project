import React from 'react';
import { Table } from 'semantic-ui-react';


// passing props from boxscore container
function GameTotals (props) {
	console.log(props);
	//if this game is over, then do this...
	
	//map needs to be passed an array, not an object.
	const byGameTotals = props.byGameTotals.map(game => (
		<li key={game.api.statistics[0].gameId}>

			<Table celled>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>Visitor's Totals:</Table.HeaderCell>
			        <Table.HeaderCell>{game.api.statistics[0].points}</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>
			</Table>
	    </li>
	))


	return(
	    <React.Fragment>
	      <h4> Game Totals</h4>
	      <ul>
	        {byGameTotals}
	      </ul>
	    </React.Fragment>
    )		
	
}


export default GameTotals;