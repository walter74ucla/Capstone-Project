import React from 'react';


// passing props from boxscore container
function NoGamesScheduled (props) {
	// console.log(props);
  	
  	if (props.selectedDay === null) {
  			return null;
  		}
  		
  		return(
		    <React.Fragment>
		      <h4>{props.selectedDay.toLocaleDateString()} Games</h4>
		      <div>
		        No Games Scheduled
		      </div>
		    </React.Fragment>
	    )	
  	

	

}


export default NoGamesScheduled;