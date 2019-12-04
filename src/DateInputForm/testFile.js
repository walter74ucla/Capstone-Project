// // the code came from here...
// // http://react-day-picker.js.org/docs/getting-started
// import React from 'react';
// import DayPicker from 'react-day-picker';
// import 'react-day-picker/lib/style.css';

// export default class Example extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleDayClick = this.handleDayClick.bind(this);
//     this.state = { 
//       selectedDay: null, // moved selectedDay: null to the BoxscoreContainer
//       // because this will allow me to pass selectedDay as props
//     };
//   }

//   handleDayClick(day, { selected }) {
//     this.setState({ // moved this.setState to the BoxscoreContainer so I can pass as props
//       selectedDay: selected ? undefined : day,
//     });
//   }

//   render() { // changed this.state.selectedDay to this.props.selectedDay
//     return (
//       <div>
//         <DayPicker
//           selectedDays={this.state.selectedDay}
//           onDayClick={this.handleDayClick}
//         />
//         <p>
//           {this.state.selectedDay
//             ? this.state.selectedDay.toLocaleDateString()
//             : 'Please select a day 👻'}
//         </p>
//       </div>
//     );
//   }
// }
