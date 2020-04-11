// https://www.w3schools.com/react/react_events.asp
import React, { Component, createRef } from 'react';
import { Table, Header, Image, Grid, Visibility } from 'semantic-ui-react';
import './style.css';


const teamLogos = [
		    	{teamId: "1", logo: "https://i.imgur.com/Kq7BbKr.png", fullName: "Atlanta Hawks"},
		    	{teamId: "2", logo: "https://i.imgur.com/ZllxvAh.png", fullName: "Boston Celtics"},
		    	{teamId: "4", logo: "https://i.imgur.com/dYRpuUv.png", fullName: "Brooklyn Nets"},
		    	{teamId: "5", logo: "https://i.imgur.com/PfpXC35.png", fullName: "Charlotte Hornets"},
		    	{teamId: "6", logo: "https://i.imgur.com/uDPZD27.png", fullName: "Chicago Bulls"},
		    	{teamId: "7", logo: "https://i.imgur.com/4pYMk58.png", fullName: "Cleveland Cavaliers"},
		    	{teamId: "8", logo: "https://i.imgur.com/XXeM6G7.png", fullName: "Dallas Mavericks"},
		    	{teamId: "9", logo: "https://i.imgur.com/0A7zhXs.png", fullName: "Denver Nuggets"},
		    	{teamId: "10", logo: "https://i.imgur.com/LEN2Uzh.png", fullName: "Detroit Pistons"},
		    	{teamId: "11", logo: "https://i.imgur.com/dsW68hf.png", fullName: "Golden State Warriors"},
		    	{teamId: "14", logo: "https://i.imgur.com/DXzHlmE.png", fullName: "Houston Rockets"},
		    	{teamId: "15", logo: "https://i.imgur.com/WFMfKNm.png", fullName: "Indiana Pacers"},
		    	{teamId: "16", logo: "https://i.imgur.com/e9B9ivY.png", fullName: "LA Clippers"},
		    	{teamId: "17", logo: "https://i.imgur.com/idShkvb.png", fullName: "Los Angeles Lakers"},
		    	{teamId: "19", logo: "https://i.imgur.com/AepoT1u.png", fullName: "Memphis Grizzlies"},
		    	{teamId: "20", logo: "https://i.imgur.com/tjwoBkp.gif", fullName: "Miami Heat"},
		    	{teamId: "21", logo: "https://i.imgur.com/58aufKB.png", fullName: "Milwaukee Bucks"},
		    	{teamId: "22", logo: "https://i.imgur.com/l2mjOHW.png", fullName: "Minnesota Timberwolves"},
		    	{teamId: "23", logo: "https://i.imgur.com/Nck6QZe.png", fullName: "New Orleans Pelicans"},
		    	{teamId: "24", logo: "https://i.imgur.com/9xJE809.gif", fullName: "New York Knicks"},
		    	{teamId: "25", logo: "https://i.imgur.com/x9dp5Ms.png", fullName: "Oklahoma City Thunder"},
		    	{teamId: "26", logo: "https://i.imgur.com/cpuQ0MH.gif", fullName: "Orlando Magic"},
		    	{teamId: "27", logo: "https://i.imgur.com/XOkEq0U.png", fullName: "Philadelphia 76ers"},
		    	{teamId: "28", logo: "https://i.imgur.com/Abf9NDQ.png", fullName: "Phoenix Suns"},
		    	{teamId: "29", logo: "https://i.imgur.com/2hGMgQw.png", fullName: "Portland Trail Blazers"},
		    	{teamId: "30", logo: "https://i.imgur.com/hfVnJcc.png", fullName: "Sacramento Kings"},
		    	{teamId: "31", logo: "https://i.imgur.com/HJjSNa4.png", fullName: "San Antonio Spurs"},
		    	{teamId: "38", logo: "https://i.imgur.com/HEVWO0q.png", fullName: "Toronto Raptors"},
	    		{teamId: "40", logo: "https://i.imgur.com/BpzstID.png", fullName: "Utah Jazz"},
	    		{teamId: "41", logo: "https://i.imgur.com/8LCV448.png", fullName: "Washington Wizards"},
	    		{teamId: "42", logo: "https://i.imgur.com/KpeyZaK.jpg", fullName: "Team World"},
	    		{teamId: "39", logo: "https://i.imgur.com/qqEMMzE.jpg", fullName: "Team USA"},
	    		{teamId: "35", logo: "https://i.imgur.com/usvyIbK.jpg", fullName: "Team LeBron"},
	    		{teamId: "34", logo: "https://i.imgur.com/22rfEKr.jpg", fullName: "Team Giannis"},
		    ]

const gameInfoListStyle = {
	listStyleType: 'none', 
	margin: 0,
	padding: 0,
}

const gameScoreContainerStyle = {
	border: '2px solid gold',
	backgroundColor: 'lightblue',
	// margin: '0px auto', // this centers the element (not necessary here)
	height: 114,
}

const gameScoreContainerStyleFixedTop = {
	...gameScoreContainerStyle,
	border: '2px solid purple',
	backgroundColor: 'silver',
	position: 'fixed',
	top: 0,
	left: 0, 
	right: 0,
	zIndex: 10,
}

const gameScoreContainerStyleFixedLeft = {//when horizontal scroll position is negative, go back to 0
	...gameScoreContainerStyle,
	position: 'relative',//fixed, absolute, sticky did not work as expected
	left: 0, //I want this to be the value of the leftScrollPos or always left: 0
	// right: 0,
}

const visitorNameContainerStyle = {
	border: '2px solid blue',
	backgroundColor: 'grey',
	margin: '0px auto', // this centers the element (not necessary here)
	height: 52,
	// border: '2px solid green',
	// backgroundColor: 'gold',
	// position: 'fixed',
	// top: 114, // height of game score container div
	// left: 0, 
	// right: 0,
	// zIndex: 10,
}

const visitorNameContainerStyleFixedTop = {
	...visitorNameContainerStyle,
	border: '2px solid green',
	backgroundColor: 'gold',
	position: 'fixed',
	top: 114, // height of game score container div
	left: 0, 
	right: 0,
	zIndex: 10,
}

const visitorNameContainerStyleFixedLeft = {//when horizontal scroll position is negative, go back to 0
	...visitorNameContainerStyle,
	position: 'relative',//fixed, absolute, sticky did not work as expected
	left: 0, //I want this to be the value of the leftScrollPos or always left: 0
	// right: 0,
}

const visitorStatsContainerStyle = {
	border: '2px solid brown',
	backgroundColor: 'yellow',
	// margin: '0px auto', // this centers the element (not necessary here)
	// height: 551,
	zIndex: 100,
}

const visitorStatsContainerStyleFixedTop = { // this container does not need to be fixed
	...visitorStatsContainerStyle,
	border: '2px solid orange',
	backgroundColor: 'teal',
	// position: '-webkit-sticky',
	// position: 'sticky',
	top: 166, // height of game score container div plus the visitor name div
	left: 0, 
	right: 0,
	zIndex: 100,
}

const visitorStatsContainerStyleFixedLeft = {//when horizontal scroll position is negative, go back to 0
	...visitorStatsContainerStyle,
	position: 'relative',//fixed, absolute, sticky did not work as expected
	left: 0, //I want this to be the value of the leftScrollPos or always left: 0
	// right: 0,
}


const footerStyleVHTot = { // puts the top border on the visitors and home totals
  // backgroundColor: 'purple',
  // color: 'white',
  borderTopColor: 'black',
  borderTopStyle: 'solid',
  borderTopWidth: 1,
}

// passing props from boxscore container
class GameInfo extends Component {
	constructor() {
		super();
		this.state = {
			gameScoreFixedTop: false,
			visitorNameFixedTop: false,
			visitorStatsFixedTop: false,
		}
	}

	contextRef = createRef();

	// Adds an event listener when the component is mount.
	componentDidMount(){
    	window.addEventListener("scroll", this.handleScroll);
  	}

  	// Remove the event listener when the component is unmount.
	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}
	
	handleScroll = (e) => { // this works on the window
    	const leftScrollPos = window.pageXOffset;
    	const topScrollPos = window.pageYOffset;
    	console.log('leftScrollPos: ', leftScrollPos);
    	console.log('topScrollPos: ', topScrollPos);
    	const viewportHeight = window.innerHeight;
    	console.log('viewportHeight: ', viewportHeight);

    	const element = e.target;
    	console.log('e: ', e);
    	console.log('element: ', element);

   //  	const gameScoreContainerDiv = document.getElementById("game-score-container");
   //  	console.log('gameScoreContainerDiv: ', gameScoreContainerDiv);
   //  	const gSCDObjPos = this.getElementPosition(gameScoreContainerDiv); // game score container div object position
   //  	console.log('gSCDObjPos: ', gSCDObjPos);
   //  	const leftSPGSCD = gSCDObjPos.left; // left scroll position game score container div
   //  	const topSPGSCD = gSCDObjPos.top; // top scroll position game score container div
   //  	console.log('leftSPGSCD: ', leftSPGSCD);
   //  	console.log('topSPGSCD: ', topSPGSCD);
   //  	const gameScoreHeight = gSCDObjPos.height; // height of game score container div
   //  	console.log('gameScoreHeight: ', gameScoreHeight);

   //  	const visitorNameContainerDiv = document.getElementById("visitor-name-container");
   //  	console.log('visitorNameContainerDiv: ', visitorNameContainerDiv);
   //  	const vNCDObjPos = this.getElementPosition(visitorNameContainerDiv); // visitor name container div object position
   //  	console.log('vNCDObjPos: ', vNCDObjPos);
   //  	const leftSPVNCD = vNCDObjPos.left; // left scroll position visitor name container div
   //  	const topSPVNCD = vNCDObjPos.top; // top scroll position visitor name container div
   //  	console.log('leftSPVNCD: ', leftSPVNCD);
   //  	console.log('topSPVNCD: ', topSPVNCD);
   //  	const visitorNameHeight = vNCDObjPos.height; // height of visitor name container div
   //  	console.log('visitorNameHeight: ', visitorNameHeight);

   //  	const visitorStatsContainerDiv = document.getElementById("visitor-stats-container");
   //  	console.log('visitorStatsContainerDiv: ', visitorStatsContainerDiv);
   //  	const vSCDObjPos = this.getElementPosition(visitorStatsContainerDiv); // visitor stats container div object position
   //  	console.log('vSCDObjPos: ', vSCDObjPos);
   //  	const leftSPVSCD = vSCDObjPos.left; // left scroll position visitor stats container div
   //  	const topSPVSCD = vSCDObjPos.top; // top scroll position visitor stats container div
   //  	console.log('leftSPVSCD: ', leftSPVSCD);
   //  	console.log('topSPVSCD: ', topSPVSCD);
   //  	const visitorStatsHeight = vSCDObjPos.height; // height of visitor stats container div
   //  	console.log('visitorStatsHeight: ', visitorStatsHeight);

   //  	const homeNameContainerDiv = document.getElementById("home-name-container");
   //  	console.log('homeNameContainerDiv: ', homeNameContainerDiv);
   //  	const hNCDObjPos = this.getElementPosition(homeNameContainerDiv); // home name container div object position
   //  	console.log('hNCDObjPos: ', hNCDObjPos);
   //  	const leftSPHNCD = hNCDObjPos.left; // left scroll position home name container div
   //  	const topSPHNCD = hNCDObjPos.top; // top scroll position home name container div
   //  	console.log('leftSPHNCD: ', leftSPHNCD);
   //  	console.log('topSPHNCD: ', topSPHNCD);
   //  	const homeNameHeight = hNCDObjPos.height; // height of home name container div
   //  	console.log('homeNameHeight: ', homeNameHeight);

   //  	const height1 = gameScoreHeight;
   //  	const height2 = gameScoreHeight + visitorNameHeight;
   //  	const height3 = gameScoreHeight + visitorNameHeight + visitorStatsHeight;
   //  	const height4 = gameScoreHeight + visitorNameHeight + visitorStatsHeight + homeNameHeight;// may need to account for the break height

   //  	this.setState({
   //  		gameScoreFixedTop: (topSPGSCD <= 0 && topSPVNCD <= height1) ? true : false,
   //  		visitorNameFixedTop: (topSPVNCD <= height1) && (topSPVSCD <= height2) ? true : false,    								
			// visitorStatsFixedTop: (topSPVSCD <= height2) && (topSPHNCD <= height3) ? true : false,
    								
   //  	})
    }

    getElementToBeTracked = () => {
    	const gameScoreContainerDiv = document.getElementsByClassName("game-score-container")[0];
    	console.log('gameScoreContainerDiv: ', gameScoreContainerDiv);
    	// this.getElementPosition(gameScoreContainerDiv);
    }
    // https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/
    // https://www.w3adda.com/react-js-tutorial/reactjs-refs
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    getElementPosition = (element) => {// works with a ref, but get TypeError: e.getBoundingClientRect 
    							// is not a function when added to the componentdidmount/willunmount
    							// eventlisteners.  Because as soon as I scroll the e becomes the 
    							// document
		console.log('element: ', element);
    	let rect = element.getBoundingClientRect(),
    	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    	
    	console.log('rect: ', rect);
    	// return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    	return rect;
    }

// Move this to a onScroll or create a function
// let elementToBeTracked = document.getElementsByClassName("game-score-container")[0];	
// console.log('elementToBeTracked: ', elementToBeTracked);


	render() {
		console.log(this.props);
		// console.log(this.props.byGamePlayerInfoName[0][0].api.players[0].playerId);
		console.log('gameScoreFixedTop: ', this.state.gameScoreFixedTop);
		console.log('visitorNameFixedTop: ', this.state.visitorNameFixedTop);
		console.log('visitorStatsFixedTop: ', this.state.visitorStatsFixedTop);

		if (this.props.byGameTotals[0].api.statistics.length === 0) {
			return null
		}

		let counter = 0;// this counts the number of games in the this.props.byGamePlayerInfoName array
	
		//map needs to be passed an array, not an object.
		const selectedGames = this.props.selectedGames.map(game => {
			// add a return statement to this function block and define new variables
			// so the sections will display next to each other
			// shout out to John Cothran of edj sports
			const byGameTotalsGameV = this.props.byGameTotals
				.find(totalsGame => totalsGame.api.statistics[0].gameId === game.gameId);
			const byGamePlayerInfoGameV = this.props.byGamePlayerInfo
				.find(totalsPlayer => totalsPlayer.api.statistics[0].gameId === game.gameId);
				// console.log(byGamePlayerInfoGameV);//this is an object
				
				// need to loop through statistics array to get each player's stats
				const playerRowV = byGamePlayerInfoGameV.api.statistics
					.filter(visitor => visitor.teamId === game.vTeam.teamId)
					// console.log(playerRowV);
					.map((player, i) => (
						<Table.Row key={player.playerId}>
							{/*<Table.Cell>{player.playerId}</Table.Cell>*/}
							<Table.Cell>
							{/*find the player based on playerId, then get the first and last names*/}
								{
								this.props.byGamePlayerInfoName[counter]
								.find(playerInfo => playerInfo.api.players[0].playerId === player.playerId)
								.api.players[0].lastName
								+ ", " + 
								this.props.byGamePlayerInfoName[counter]
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

			const byGameTotalsGameH = this.props.byGameTotals
				.find(totalsGame => totalsGame.api.statistics[1].gameId === game.gameId);
			const byGamePlayerInfoGameH = this.props.byGamePlayerInfo
				.find(totalsPlayer => totalsPlayer.api.statistics[1].gameId === game.gameId);
				// console.log(byGamePlayerInfoGameH);//this is an object
				
				// need to loop through statistics array to get each player's stats
				const playerRowH = byGamePlayerInfoGameH.api.statistics
					.filter(home => home.teamId === game.hTeam.teamId)
					// console.log(playerRowH);
					.map((player, i) => (
						<Table.Row key={player.playerId}>
							{/*<Table.Cell>{player.playerId}</Table.Cell>*/}
							<Table.Cell>
							{/*find the player based on playerId, then get the first and last names*/}
								{
								this.props.byGamePlayerInfoName[counter]
								.find(playerInfo => playerInfo.api.players[0].playerId === player.playerId)
								.api.players[0].lastName
								+ ", " + 
								this.props.byGamePlayerInfoName[counter]
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

		// console.log(counter);
		counter+=1


		return(
			game.startTimeUTC.length === 10
				?	null
				:
			<li key={game.gameId}>
			  	
			  	{/*<div
			  		id='game-score-container'
			  		style={this.state.gameScoreFixedTop ? gameScoreContainerStyleFixedTop : gameScoreContainerStyle}
			  		// ref={this.getElementPosition}
			  		// index.js:1375 Warning: React does not recognize the `getElementPosition` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `getelementposition` instead.
			  		// Warning: Invalid value for prop `getelementposition` on <div> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://fb.me/react-attribute-behavior
			  		// getelementposition={(e) => this.getElementPosition(e)}
			  		className={!this.props.gameScoreFixed ? 'game-score-container' : 'game-score-container-fixed'}

			  	>*/}
			    <Table id='game-score' unstackable attached='top' textAlign='center'>
			    	<Table.Header>
				      	<Table.Row>
				        	<Table.HeaderCell>	
			        			<Header as='h4'>
            						{game.vTeam.shortName}
						        </Header>
				        	</Table.HeaderCell>
				        	<Table.HeaderCell>
				        		<Header as='h4'>
            						{game.vTeam.score.points}
						        </Header>
				        	</Table.HeaderCell>
				        	<Table.HeaderCell>
			        			<Header as='h4'>
            						{game.currentPeriod !== "" ? "FINAL" : null}
						        </Header>
				        	</Table.HeaderCell>
				        	<Table.HeaderCell>
			       				<Header as='h4'>
            						{game.hTeam.score.points}
						        </Header>
				        	</Table.HeaderCell>
				        	<Table.HeaderCell>
			        			<Header as='h4'>
            						{game.hTeam.shortName}
						        </Header>
				        	</Table.HeaderCell>
				      	</Table.Row>
				      	<Table.Row>
				      		<Table.HeaderCell>
				        		<Header as='h4' image>
				        			<Image src={teamLogos.find(teamLogo => 
				        				teamLogo.teamId === game.vTeam.teamId).logo} size='mini' />
				        		</Header>
				        	</Table.HeaderCell>
				        	<Table.HeaderCell>
			        			
				        	</Table.HeaderCell>
				        	<Table.HeaderCell>
			        			<Header as='h4'>
            						{game.currentPeriod === "5/4" ? "OT" 
            							: game.currentPeriod === "6/4" ? "2OT"
            							: game.currentPeriod === "7/4" ? "3OT"
            							: game.currentPeriod === "8/4" ? "4OT"
            							: game.currentPeriod === "9/4" ? "5OT"
            							: null
            						}
						        </Header>
				        	</Table.HeaderCell>
				        	<Table.HeaderCell>
			        			
				        	</Table.HeaderCell>
				        	<Table.HeaderCell>
				        		<Header as='h4' image>
				        			<Image src={teamLogos.find(teamLogo => 
				        				teamLogo.teamId === game.hTeam.teamId).logo} size='mini' />
				        		</Header>
				        	</Table.HeaderCell>
				      	</Table.Row>
					</Table.Header>
			    </Table>
			   	{/*</div>*/}
			   	{/*<br/>*/}
				{/*<div 
					id='visitor-name-container' 
					style={this.state.visitorNameFixedTop ? 
							visitorNameContainerStyleFixedTop : visitorNameContainerStyle}
				>*/}
			    <Table id='visitor-name' unstackable attached>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>{game.vTeam.fullName}</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>
				</Table>
				{/*</div>*/}
				{/*<br/>*/}
				{/*<div 
					id='visitor-stats-container'
					// style={this.state.visitorStatsFixedTop ? 
							// visitorStatsContainerStyleFixedTop : visitorStatsContainerStyle}
					// className={ true ? 'visitor-stats-container' : 'visitor-stats-container-fixed'}
				>*/}
				<Table 
					id='visitor-stats'
					celled 
					striped 
					unstackable
					attached
					className={false ? 'freeze-head-and-col' : 'freeze-head-and-col-fixed'}
				>
				    <Table.Header>
				      <Table.Row>
				        {/*<Table.HeaderCell>Player ID</Table.HeaderCell>*/}
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
					<Table.Body>
				    	{playerRowV}
				    </Table.Body>
				    <Table.Footer>
				      <Table.Row>
				        <Table.HeaderCell style={footerStyleVHTot}>Visitor's Totals:</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameV.api.statistics[0].min}</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameV.api.statistics[0].points}</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameV.api.statistics[0].totReb}</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameV.api.statistics[0].assists}</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameV.api.statistics[0].pFouls}</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameV.api.statistics[0].steals}</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameV.api.statistics[0].turnovers}</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameV.api.statistics[0].blocks}</Table.HeaderCell>
				      </Table.Row>
				    </Table.Footer>
			    </Table>
				{/*</div>*/}
			
				    {/*<div 
						id='home-name-container' 
						// style={this.state.homeNameFixedTop ? 
								// homeNameContainerStyleFixedTop : homeNameContainerStyle}
					>*/}
				<Table id='blank-row' unstackable attached>
				    <Table.Body>
				      <Table.Row>
				        <Table.Cell></Table.Cell>
				      </Table.Row>
				    </Table.Body>
				</Table>	  
			    <Table id='home-name'unstackable attached>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>{game.hTeam.fullName}</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>
				</Table>	
				<Table 
					id='home-stats' 
					celled 
					striped 
					unstackable 
					attached='bottom' 
					className='freeze-head-and-col'
				>
				    <Table.Header>
				      <Table.Row>
				        {/*<Table.HeaderCell>Player ID</Table.HeaderCell>*/}
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
					<Table.Body>
				    	{playerRowH}
				    </Table.Body>
				    <Table.Footer>
				      <Table.Row>
				        <Table.HeaderCell style={footerStyleVHTot}>Home Totals:</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameH.api.statistics[1].min}</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameH.api.statistics[1].points}</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameH.api.statistics[1].totReb}</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameH.api.statistics[1].assists}</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameH.api.statistics[1].pFouls}</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameH.api.statistics[1].steals}</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameH.api.statistics[1].turnovers}</Table.HeaderCell>
				        <Table.HeaderCell style={footerStyleVHTot}>{byGameTotalsGameH.api.statistics[1].blocks}</Table.HeaderCell>
				      </Table.Row>
				    </Table.Footer>
			    </Table>
			<br/>
			</li>
		)})
		
		return(
		    <React.Fragment>
				{/*<div className='game-info' onScroll={(e) => props.handleScrollE(e)}>*/}
				  	{/*<div className='game-info-scroll'>*/}
					  	<h4>Game Info</h4>
						<ul style={gameInfoListStyle}>
						{selectedGames}
						</ul>
					{/*</div>*/}
			  	{/*</div>*/}
		    </React.Fragment>
	    )
	}
}

export default GameInfo;


// https://www.w3schools.com/jsref/prop_element_scrollleft.asp
// This works with an outer div and an inner div.
// It helps to include overflow-x: scroll and overflow-y: scroll or overflow: auto in the  outer div css.
// The GameInfo component did not push the components above it off the screen. The components above the
// flow of GameInfo had to be manually scrolled to get off the viewport.


