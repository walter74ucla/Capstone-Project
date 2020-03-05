import React from 'react';
import { Loader } from 'semantic-ui-react';


// passing props from boxscore container
function NoGamesScheduled (props) {
	// console.log(props);
  	
  	if (props.selectedDay === null) {
  			return null;
  		} else if (props.isLoading) {
  			return(
				<Loader active inline='centered' size='medium' content='loading' />
			)		
		} else if (!props.isLoading) {
			return(
			    <React.Fragment>
			      <h4>{props.selectedDay.toLocaleDateString()} Games</h4>
			      <div>
			        No Games Scheduled
			      </div>
			    </React.Fragment>
		    )
		}

}


export default NoGamesScheduled;