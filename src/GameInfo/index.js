import React from 'react';
import { Table, Header, Image } from 'semantic-ui-react';


// passing props from boxscore container
function GameInfo (props) {
	console.log(props);
	console.log(props.byGamePlayerInfoName[0][0].api.players[0].playerId);

	let counter = 0;// this counts the number of games in the props.byGamePlayerInfoName array
	// create function to transform playerid to last name, first name
	
	//map needs to be passed an array, not an object.
	const selectedGames = props.selectedGames.map(game => {
		// add a return statement to this function block and define new variables
		// so the sections will display next to each other
		// shout out to John Cothran of edj sports
		const byGameTotalsGameV = props.byGameTotals
			.find(totalsGame => totalsGame.api.statistics[0].gameId === game.gameId);
		const byGamePlayerInfoGameV = props.byGamePlayerInfo
			.find(totalsPlayer => totalsPlayer.api.statistics[0].gameId === game.gameId);
			// console.log(byGamePlayerInfoGameV);//this is an object
			
			// need to loop through statistics array to get each player's stats
			const playerRowV = byGamePlayerInfoGameV.api.statistics
				.filter(visitor => visitor.teamId === game.vTeam.teamId)
				// console.log(playerRowV);
				.map((player, i) => (
					<Table.Row key={player.playerId}>
						<Table.Cell>{player.playerId}</Table.Cell>
						<Table.Cell>
						{/*find the player based on playerId, then get the first and last names*/}
							{
							props.byGamePlayerInfoName[counter]
							.find(playerInfo => playerInfo.api.players[0].playerId === player.playerId)
							.api.players[0].lastName
							+ ", " + 
							props.byGamePlayerInfoName[counter]
							.find(playerInfo => playerInfo.api.players[0].playerId === player.playerId)
							.api.players[0].firstName
							}
						</Table.Cell>
					    <Table.Cell>{player.min}</Table.Cell>
					    <Table.Cell>{player.points}</Table.Cell>
					    <Table.Cell>{player.totReb}</Table.Cell>
					    <Table.Cell>{player.assists}</Table.Cell>
					    <Table.Cell>{player.pFouls}</Table.Cell>
					    <Table.Cell>{player.steals}</Table.Cell>
					    <Table.Cell>{player.turnovers}</Table.Cell>
					    <Table.Cell>{player.blocks}</Table.Cell>
				    </Table.Row>
				));
			

			// Another try...
			// want to add key value pairs to objects in the playerRowV array
			// const playerRowV = byGamePlayerInfoGameV.api.statistics
			// 	.filter(visitor => visitor.teamId === game.vTeam.teamId);
			// 	console.log(playerRowV); //This gives me the array I want

			// const vPlayersInGame = props.byGamePlayerInfoName
			// .filter(vPlayersIG => {for(let i=0; i<vPlayersIG[counter].length; i++){
			// 	if(vPlayersIG[counter][i].api.players[0].teamId === playerRowV[0].teamId){
			// 		return vPlayersIG
			// 	}
			// }}); //This gives me a blank array
			// // .filter(value => value[0][0].api.players[0].firstName === "Kawhi") //???TypeError: Cannot read property 'api' of undefined
			// console.log(vPlayersInGame);
		

			// Another another try...trying to get the first element of the first props.byGamePlayerInfoName array
			// want to add key value pairs to objects in the playerRowV array
			// const playerRowV = byGamePlayerInfoGameV.api.statistics
			// 	.filter(visitor => visitor.teamId === game.vTeam.teamId);
			// 	console.log(playerRowV); //This gives me the same array, i.e., counter never +=1

			// const vPlayersInGame = props.byGamePlayerInfoName
			// .filter(value => value[0][0].api.players[0].firstName === "Kawhi") //???TypeError: Cannot read property 'api' of undefined
			// console.log(vPlayersInGame);

	console.log(counter);

				// .map((player, i) => (
					{/*<Table.Row key={player.playerId}>
						<Table.Cell>{player.playerId}</Table.Cell>
						{/*<Table.Cell>{/*for(let j=0; j<props.byGamePlayerInfo.length; j++)*/}{/*need to figure out how loop through multiple games*/}
							{/*{(player.playerId 
							=== props.byGamePlayerInfoName[counter][i].api.players[0].playerId) 
							? props.byGamePlayerInfoName[counter][i].api.players[0].lastName 
							: null	
							}</Table.Cell>*/}{/*this almost worked...failed if arrays did not perfectly line up*/}
						{/*<Table.Cell>{/*for(let j=0; j<props.byGamePlayerInfo.length; j++)*/}{/*need to figure out how loop through multiple games*/}
							{/*{(player.playerId 
							=== props.byGamePlayerInfoName.find(id => player.playerId === props.byGamePlayerInfoName[counter][i].api.players[0].playerId))
							? props.byGamePlayerInfoName[counter][i].api.players[0].lastName 
							: null	
							}</Table.Cell>*/}{/*this did not work...gave a blank column*/}
					    {/*<Table.Cell>{player.points}</Table.Cell>
				    </Table.Row>*/}
				// ));
	counter+=1


		return (
			<li key={game.gameId}>
			    <Table celled>
			    	<Table.Body>
				      	<Table.Row>
				        	<Table.Cell>
				        		<Header as='h4' image>
				        			<Image src={game.vTeam.logo} size='mini' />
				        			<Header.Content>
				        				{game.vTeam.shortName} versus {game.hTeam.shortName}
				        			</Header.Content>
				        		</Header>
				        	</Table.Cell>
				      	</Table.Row>
					</Table.Body>
			    </Table>  
				    <Table celled>
					    <Table.Header>
					      <Table.Row>
					        <Table.HeaderCell>{game.vTeam.fullName}</Table.HeaderCell>
					      </Table.Row>
					    </Table.Header>
					    <Table.Header>
					      <Table.Row>
					        <Table.HeaderCell>Player ID</Table.HeaderCell>
					        <Table.HeaderCell>Player</Table.HeaderCell>
					        <Table.HeaderCell>MIN</Table.HeaderCell>
					        <Table.HeaderCell>PTS</Table.HeaderCell>
					        <Table.HeaderCell>REB</Table.HeaderCell>
					        <Table.HeaderCell>AST</Table.HeaderCell>
					        <Table.HeaderCell>F</Table.HeaderCell>
					        <Table.HeaderCell>STL</Table.HeaderCell>
					        <Table.HeaderCell>TO</Table.HeaderCell>
					        <Table.HeaderCell>BLK</Table.HeaderCell>
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
			<br/>
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