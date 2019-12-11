import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Register from './Register';
import BoxscoreContainer from './BoxscoreContainer';
import SelectFavoriteTeams from './SelectFavoriteTeamsForm';
import HeaderComponent from './HeaderComponent';
import { Route, Switch } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

// add login/logout here???
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
      <HeaderComponent />
      {/*<Header>Test</Header>*/}
        <Switch>
          <Route exact path="/login" component= { Login } />
          <Route exact path="/register" component= { Register } />
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