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

	let counter = 0;// this counts the number of games in the props.byGamePlayerInfoName array
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
		const byGameTotalsGameV = props.byGameTotals
			.find(totalsGame => totalsGame.api.statistics[0].gameId === game.gameId);
		const byGamePlayerInfoGameV = props.byGamePlayerInfo
			.find(totalsPlayer => totalsPlayer.api.statistics[0].gameId === game.gameId);
			// console.log(byGamePlayerInfoGameV);//this is an object
			
			// need to loop through statistics array to get each player's stats
			// Almost worked
			const playerRowV = byGamePlayerInfoGameV.api.statistics
				.filter(visitor => visitor.teamId === game.vTeam.teamId)
				// console.log(playerRowV);
				.map((player, i) => (
					<Table.Row key={player.playerId}>
						<Table.Cell>{player.playerId}</Table.Cell>
						<Table.Cell>{/*for(let j=0; j<props.byGamePlayerInfo.length; j++)*/}{/*need to figure out how loop through multiple games*/}
							{(player.playerId 
							=== props.byGamePlayerInfoName[counter][i].api.players[0].playerId) 
							? props.byGamePlayerInfoName[counter][i].api.players[0].lastName 
							: null	
							}</Table.Cell>{/*this almost worked...failed if arrays did not perfectly line up*/}
					    <Table.Cell>{player.points}</Table.Cell>
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

					
				// const visitorPlayersByGame = allPlayersInGame
				// 	.filter(vPBG => vPBG.api.players[0].teamId === playerRowV.teamId);
					// console.log(visitorPlayersByGame);
					console.log(counter);


				// .concat(props.byGamePlayerInfoName.filter(visTeam => visTeam[counter][i].api.players[0].teamId === game.vTeam.teamId)
				
				// .map((player, i) => (
					{/*<Table.Row key={player.playerId}>
						<Table.Cell>{player.playerId}</Table.Cell>
						{/*<Table.Cell>{props.createFullName(player.playerId, props.byGamePlayerInfoName)}</Table.Cell>*/}
						{/*<Table.Cell>{createName(player.playerId)}</Table.Cell>*/}{/*this gave a blank column*/}
						{/*<Table.Cell>{const lastNameObj = props.byGamePlayerInfoName.find(j => props.byGamePlayerInfoName[j][i].api.players[0].playerId === player.playerId);
										lastNameObj[i].api.players[0].lastName}</Table.Cell>*/}
						{/*<Table.Cell>{CreateName(player.playerId, props.byGamePlayerInfoName)}</Table.Cell>*/}
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