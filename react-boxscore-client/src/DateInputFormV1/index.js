// this code came from here...
// https://react.semantic-ui.com/modules/dropdown/#usage-controlled
import React, { Component } from 'react'
import { Dropdown, Grid, Segment } from 'semantic-ui-react'

const options = [
  { key: 1, text: 'One', value: 1 },
  { key: 2, text: 'Two', value: 2 },
  { key: 3, text: 'Three', value: 3 },
]

export default class DropdownExampleControlled extends Component {
  state = {}

  handleChange = (e, { value }) => 
    this.setState({ value },
      console.log(value), // I added this
      this.props.inputDate(e, { value })// I added this
    )

  render() {
    const { value } = this.state

    return (
      <Grid columns={2}>
        <Grid.Column>
          <Dropdown
            onChange={this.handleChange}
            options={options}
            placeholder='Choose an option'
            selection
            value={value}
          />
        </Grid.Column>
        <Grid.Column>
          <Segment secondary>
            <pre>Current value: {value}</pre>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}













// This code did not work...
// import React, { Component } from 'react';
// import { Form } from 'semantic-ui-react';

// const options = [
//   { key: 'm', text: 'Male', value: 'male' },
//   { key: 'f', text: 'Female', value: 'female' },
//   { key: 'o', text: 'Other', value: 'other' },
// ]

// class DateInputForm extends Component {
//   constructor(){
//     super();

//     this.state = {
//       gender: ''
//     }
//   }

//   handleSelectChange = (e) => {
//     // es6 computed properties [e.currentTarget.value]
//     this.setState({[e.currentTarget.name]: e.currentTarget.value})
//     console.log(this.state);
//   }

//   handleSubmit = (e) =>{
//     console.log(this.state);
//     this.props.inputDate(e, this.state);
//     // this.setState({gender:''})
//   }

//   render() {
    
//     return (
//       <Form onSubmit={this.handleSubmit}>
//         <Form.Group widths='equal'>
//           <Form.Select
//             label='Gender'
//             options={options}
//             placeholder='Gender'
//             name='gender' 
//             value={value} /*stuck here */
//             onChange={this.handleSelectChange}
//           />
//         </Form.Group>
        
//         <Form.Button color="teal" type="submit">
//           Submit 
//         </Form.Button>
      
//       </Form>
//     )
//   }
// }

// export default DateInputForm