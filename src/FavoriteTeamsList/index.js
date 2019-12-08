import React from 'react';
import { Item, Button} from 'semantic-ui-react';

function FavoriteTeamsList(props){
//update key
//update image source
//update favorite team
  const favoriteTeams = props.favoriteTeams.map((team) => {
    return (
      <Item.Group divided>
        <Item key={team.favoriteTeam.id}>
          <Item.Image size='tiny' src='https://imgur.com/Ox5WIoz' alt='team logo' />
          <Item.Content verticalAlign='middle'>Favorite Team</Item.Content>
          <Button floated='right' onClick={() => props.deleteFavoriteTeam(favoriteTeam.id)}>Remove</Button>
        </Item>
      </Item.Group>
    )
  })

  return (
      <React.Fragment>
        { favoriteTeams }
      </React.Fragment>
    )
}

export default FavoriteTeamsList