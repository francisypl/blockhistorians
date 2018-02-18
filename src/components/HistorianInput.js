import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ipfsFunctions from '../utils/getIpfsHash';

class HistorianInput extends Component {

  constructor(props) {
    super(props)
    this.state = {
      date: '',
      text: '',
      resources: '',
    };
    this.formatDocument = this.formatDocument.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  setDate(event, date) {
    this.setState({ date })
  }

  formatDocument() {
    let fileData = {
      date: this.state.date,
      text: this.state.text,
      resources: this.state.resources
    }
    
    ipfsFunctions.uploadEntry(fileData)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <DatePicker
            hintText="Select date of event"
            onChange={this.setDate}
          />
          <div>
            <TextField
              hintText="Enter event here"
              onChange={event => this.setState({ text: event.target.value })}
            />
          </div>
          <div>
            <TextField
              hintText="Enter resources"
              onChange={event => this.setState({ resources: event.target.value })}
            />
          </div>
          <RaisedButton 
            label="Submit"
            onClick={this.formatDocument}
          />
        </div>
      </MuiThemeProvider >
    )
  }
}

export default HistorianInput;



