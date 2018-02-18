import React, { Component } from 'react'

export default class EntriesList extends Component {
  render() {
    const { entries } = this.props;
    return (
      <div>
        {entries && entries.map(entry => {
          
        })}
      </div>
    );
  }
}