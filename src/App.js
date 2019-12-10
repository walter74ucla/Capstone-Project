import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './Login';
import BoxscoreContainer from './BoxscoreContainer';
import SelectFavoriteTeams from './SelectFavoriteTeamsForm';
import { Route, Switch } from 'react-router-dom';


const My404 = () => {
  return (
    <div>
      You are Lost
    </div>
    )
};

const App = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/login" component= { Login } />
        <Route exact path="/" component={ BoxscoreContainer } />
        <Route exact path="/favorite_teams" component={ SelectFavoriteTeams } />
        <Route component={My404} />
      </Switch>
    </main>
    )
};


export default App;


// old code before react router
// function App() {
    
//   return(
//     <React.Fragment>
//         Some App text.
//         <h2>A heading</h2>
//         <BoxscoreContainer />
//     </React.Fragment>
//   )

// }