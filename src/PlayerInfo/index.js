import React from 'react';
import { Table } from 'semantic-ui-react';


// passing props from boxscore container
function PlayerInfo (props) {
	
	//map needs to be passed an array, not an object.
	const byGamePlayerInfo = props.byGamePlayerInfo.map(game => (
		<li key={game.api.statistics[0].gameId}>

			<Table celled striped>
			    <Table.Body>
			      <Table.Row>
			        <Table.Cell>{game.api.statistics[0].playerId}</Table.Cell>
			        <Table.Cell>{game.api.statistics[0].points}</Table.Cell>
			      </Table.Row>
		    	</Table.Body>
			</Table>
	    </li>
	))


	return(
	    <React.Fragment>
	      <h4> Player Info</h4>
	      <ul>
	        {byGamePlayerInfo}
	      </ul>
	    </React.Fragment>
    )		

}


export default PlayerInfo;