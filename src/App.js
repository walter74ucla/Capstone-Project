import React, { Component } from 'react';
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

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      screen_name: '',
      logged: true
    }
  }

  login = (screen_name) => {
      console.log(screen_name);
      this.setState({
        screen_name: screen_name,
        logged: true  
      })
      console.log(this.state);//REMOVE THIS Console.log so the password does not show
  }

  logout = () => {
      this.setState({
        logged: false
      })
      console.log(this.state);
  }

  render() {
    return (
      <main>
        <HeaderComponent screen_name={this.state.screen_name} logout={this.logout}/>
          <Switch>
            <Route exact path="/login" render={(props) => <Login {...props} login={this.login} />} />
            <Route exact path="/register" component= { Register } />
            <Route exact path="/" component={ BoxscoreContainer } />
            <Route exact path="/favorite_teams" component={ SelectFavoriteTeams } />
            <Route component={My404} />
          </Switch>
      </main>
      )
  }
  
};


export default App;


// For the Login component
// https://tylermcginnis.com/react-router-pass-props-to-components/

// This code worked...
// const App = () => {
//   return (
//     <main>
//       <HeaderComponent />
//         <Switch>
//           <Route exact path="/login" component= { Login } />
//           <Route exact path="/register" component= { Register } />
//           <Route exact path="/" component={ BoxscoreContainer } />
//           <Route exact path="/favorite_teams" component={ SelectFavoriteTeams } />
//           <Route component={My404} />
//         </Switch>
//     </main>
//     )
// };



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
