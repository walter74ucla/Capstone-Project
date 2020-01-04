import React from 'react';
import { Table } from 'semantic-ui-react';


// function CreateName (playerId, playerArray) {
// 	let nameArray = playerArray;
// 	    for(let i=0; i<nameArray.length; i++){
// 	    	for(let j=0; j<nameArray[i][j].length; j++){
// 	    		if(playerId === nameArray[i][j].api.players[j].playerId){
// 	    			let firstName = nameArray[i][j].api.players[j].firstName;
// 	    			let lastName = nameArray[i][j].api.players[j].lastName;
// 	    			let fullName = `${lastName}, ${firstName}`;
// 	    			return fullName;
// 	    		}
// 	    	}
// 	    }
//     }




// passing props from boxscore container
function GameInfo (props) {
	console.log(props);
	console.log(props.byGamePlayerInfoName[0][0].api.players[0].playerId);
	// create function to transform playerid to last name, first name
	let createName = (playerId) => {
	let nameArray = props.byGamePlayerInfoName;
	    for(let i=0; i<nameArray.length; i++){
	    	for(let j=0; j<nameArray[i][j].length; j++){
	    		if(playerId === nameArray[i][j].api.players[0].playerId){
	    			let firstName = nameArray[i][j].api.players[0].firstName;
	    			let lastName = nameArray[i][j].api.players[0].lastName;
	    			let fullName = `${lastName}, ${firstName}`;
	    			return fullName;
	    		}
	    	}
	    }
    }
	//map needs to be passed an array, not an object.
	const selectedGames = props.selectedGames.map(game => {
		// add a return statement to this function block and define new variables
		// so the sections will display next to each other
		// shout out to John Cothran of edj sports
		const byGameTotalsGameV = props.byGameTotals.find(totalsGame => totalsGame.api.statistics[0].gameId === game.gameId);
		const byGamePlayerInfoGameV = props.byGamePlayerInfo.find(totalsPlayer => totalsPlayer.api.statistics[0].gameId === game.gameId);
			// need to loop through statistics array to get each player's stats
			const playerRowV = byGamePlayerInfoGameV.api.statistics
				.filter(visitor => visitor.teamId === game.vTeam.teamId)
				.map((player, i) => (
					<Table.Row key={player.playerId}>
						<Table.Cell>{player.playerId}</Table.Cell>
						{/*<Table.Cell>{createName(player.playerId)}</Table.Cell>*/}
						{/*<Table.Cell>{const lastName = props.byGamePlayerInfoName.find(j => props.byGamePlayerInfoName[0][i].api.players[0].playerId === player.playerId);
										lastName[i].lastName}</Table.Cell>*/}
						{/*<Table.Cell>{CreateName(player.playerId, props.byGamePlayerInfoName)}</Table.Cell>*/}
						<Table.Cell>{/*for(let j=0; j<props.byGamePlayerInfo.length; j++)*/}
							{(player.playerId 
							=== props.byGamePlayerInfoName[0][i].api.players[0].playerId) 
							? props.byGamePlayerInfoName[0][i].api.players[0].lastName 
							: null	
							}</Table.Cell>
					    <Table.Cell>{player.points}</Table.Cell>
				    </Table.Row>
				));

		return (
			<li key={game.gameId}>
			    {game.vTeam.shortName} versus {game.hTeam.shortName}
				    <Table celled>
					    <Table.Header>
					      <Table.Row>
					        <Table.HeaderCell>{game.vTeam.fullName}</Table.HeaderCell>
					      </Table.Row>
					    </Table.Header>
						<Table.Header>
					      {playerRowV}
					    </Table.Header>
					    <Table.Header>
					      <Table.Row>
					        <Table.HeaderCell>Visitor's Totals:</Table.HeaderCell>
					        <Table.HeaderCell>{byGameTotalsGameV.api.statistics[0].points}</Table.HeaderCell>
					      </Table.Row>
					    </Table.Header>
				    </Table>
			</li>
	
		)})


	return(
	    <React.Fragment>
	      <h4>Game Info</h4>
	      <ul>
	        {selectedGames}
	      </ul>
	      {/*<Table celled striped>
		    <Table.Header>
		      <Table.Row>
		        <Table.HeaderCell>Header</Table.HeaderCell>
		        <Table.HeaderCell>Header</Table.HeaderCell>
		        <Table.HeaderCell>Header</Table.HeaderCell>
		      </Table.Row>
		    </Table.Header>

		    <Table.Body>
		      <Table.Row>
		        <Table.Cell>Cell</Table.Cell>
		        <Table.Cell>Cell</Table.Cell>
		        <Table.Cell>Cell</Table.Cell>
		      </Table.Row>
		      <Table.Row>
		        <Table.Cell>Cell</Table.Cell>
		        <Table.Cell>Cell</Table.Cell>
		        <Table.Cell>Cell</Table.Cell>
		      </Table.Row>
		      <Table.Row>
		        <Table.Cell>Cell</Table.Cell>
		        <Table.Cell>Cell</Table.Cell>
		        <Table.Cell>Cell</Table.Cell>
		      </Table.Row>
		    </Table.Body>
		  </Table>*/}
	    </React.Fragment>
    )		

}


export default GameInfo;
// export default {GameInfo, CreateName};


// Old way
// const byGameTotals = props.byGameTotals.map(game => (
// 		<li key={game.api.statistics[0].gameId}>

// 			<Table celled>
// 			    <Table.Header>
// 			      <Table.Row>
// 			        <Table.HeaderCell>Visitor's Totals:</Table.HeaderCell>
// 			        <Table.HeaderCell>{game.api.statistics[0].points}</Table.HeaderCell>
// 			      </Table.Row>
// 			    </Table.Header>
// 			</Table>
// 	    </li>
// 	))


// return(
// 	    <React.Fragment>
// 	      <h4>Game Info</h4>
// 	      <ul>
// 	        {byGameTotals}
// 	      </ul>
// 	    </React.Fragment>
//     )