// the base code came from here...
// http://react-day-picker.js.org/docs/getting-started
import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';


export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);

  }

  handleDayClick(day, { selected }) {
    // console.log('handleDayClick:', day, selected);
    this.props.inputDate(day, selected)
  }

  render() {
    // console.log('Render SelectedDay:', this.props.selectedDay)
    return (
      <div>
        <DayPicker
          selectedDays={this.props.selectedDay}
          onDayClick={this.handleDayClick}
          todayButton="Go to Today"
          modifiers={{
            foo: new Date(),
          }}
          onTodayButtonClick={(day, modifiers) => console.log(day, modifiers)}
        />
        <p>
          {this.props.selectedDay
            ? this.props.selectedDay.toLocaleDateString()
            : 'Please select a day 👻'}
        </p>
      </div>
    );
  }
}