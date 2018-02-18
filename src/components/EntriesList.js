import React, { Component } from 'react';

export default class EntriesList extends Component {
  render() {
    const { entries } = this.props;
    return (
      <div>
        {entries && entries.map((entry, index) =>
          <div key={ index }>
            <div>{ entry.date || 'No date found' }</div>
            <div>{ entry.text || 'No text found' }</div>
            <div>{ entry.resource[0] || 'No resource found' }</div>
          </div>
        )}
      </div>
    );
  }
}