# Capstone-Project

![wireframe](/public/images/BoxscoreHomepage-rot.jpg)

![wireframe](/public/images/entityRelationshipDiagram_ERD-rot.jpg)

After project started, it was clear that the many-to-many relationship was
not necessary for this project.  One-to-many relationship is being used.


## Boxscore User Experience

https://react-boxscore-app.herokuapp.com/

The ultimate goal is to display daily NBA boxscores on a single, web page, just like you would read a newspaper boxscore.  This will eliminate the need for multiple clicks when searching for boxscore information on your favorite website.  A user is also able to see boxscores for any date selected via a calendar.

This is a React.js app on the front end and a flask app on the back end.  The app makes third party API calls to API-NBA to get boxscore data.  In addition,
the app uses react-day-picker component for the main calendar.

https://rapidapi.com/ <-- this site gives Freemium data, up to 1000 requests per day

# Steps for creating a react app
$ npm i -g create-react-app <-- did this already (during the first react.js lesson)<br />
$ create-react-app folder-name<br />
$ npm run start <-- this fires up the server<br />

update the .gitignore file as necessary<br />
https://github.com/facebook/react/blob/master/.gitignore

# Steps for setting up react-day-picker
$ npm install react-day-picker --save<br />
import DayPicker from 'react-day-picker';<br />
import 'react-day-picker/lib/style.css';<br />

# Steps for setting up react router
$ npm install react-router-dom<br />
import { BrowserRouter } from 'react-router-dom'; (in index.js)<br />
Then wrap our whole app in the browserRouter from the react-router-dom module.<br />


* User lands on a home page that displays the daily boxscores.  On this page, the user has the option to Sign Up or Log In.  If the User Signs Up or Logs In, the User’s Favorite Team(s) boxscores will be displayed at the top of the boxscores list
* If the User clicks “Sign Up,” the User lands on a page where the user can register to the site by entering:
	- Screen Name (Editable)
	- Email
	- Password
* After signing up, the User lands on the home page. The user can then choose to “Select Favorite Team(s)” on the menu bar in the header.  Then the User can select their favorite teams via a checkbox selector.
	
* A user will be able to logout

Trello Board: https://trello.com/b/kP3nVa2t/capstone-project-boxscore

* Stretch Goals/Unsolved Problems
	- edit screen name functionality
	- boxscore display
	- Menu Bar styling 
	- Displaying favorite box scores on top
	- Let the User Delete their account
	- Disable Future Dates on Calendar
	- Add Schedule feature for future dates
	- Add Standings
	- Add League Leaders
	- Add Goto “Today” on the Date Picker calendar
	- More secure if you make third party API calls from the server as opposed to the client
	- Add Other Leagues


