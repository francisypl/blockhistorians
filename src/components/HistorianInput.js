import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

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
  }

  formatDocument() {
    let fileData = {
      date: this.state.date,
      text: this.state.text,
      resources: this.state.resources
    };

    console.log('fileData =>', fileData);
    
    ipfsFunctions.uploadEntry(fileData)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    const containerStyles = {
      display: 'flex',
      flexDirection: 'column',
      width: '70%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '150px'
    };
    return (
      <div style={containerStyles}>
        <Typography variant="headline" style={{ marginBottom: '20px' }} component="h1">
          { 'New Proposal' }
        </Typography>
        <TextField
          label="Date of Event"
          type="date"
          style={{ margin: '10px' }}
          InputLabelProps={{
            shrink: true,
          }}
          margin='normal'
          onChange={ event => this.setState({ date: event.target.value }) }
        />
        <TextField
          label='Event Description'
          margin='normal'
          onChange={ event => this.setState({ text: event.target.value }) }
        />
        <TextField
          label='Resources'
          margin='normal'
          onChange={ event => this.setState({ resources: event.target.value }) }
        />
        <Button variant='raised' color='primary' style={{ marginTop: '20px' }} onClick={this.formatDocument}>Submit</Button>
        <Button variant='raised' color='secondary' style={{ marginTop: '15px' }} onClick={this.props.cancel}>Cancel</Button>
      </div>
    )
  }
}

export default HistorianInput;



