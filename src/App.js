import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import ContractHelper from './BlockHistoriansContractWrapper';
import EntriesList from './components/EntriesList';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contractVersion: '',
      blockHistoriansInstance: null,
      entries: [],
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(async results => {
      this.setState({
        web3: results.web3
      });

      // Instantiate contract once web3 provided.
      await this.instantiateContract();
      const { blockHistoriansInstance } = this.state;
      const version = await blockHistoriansInstance.getVersion();
      const entries = await blockHistoriansInstance.getEntries();
      this.setState({ contractVersion: version, entries });
    })
    .catch((e) => {
      console.log('Error finding web3.', e);
    });
  }

  async instantiateContract() {
    const helper = new ContractHelper(this.state.web3);
    await helper.init();
    this.setState({ blockHistoriansInstance: helper });
    return helper;
  }

  render() {
    const { contractVersion, entries } = this.state;
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Block Historians</a>
            <span style={{ color: 'white' }}>Contract Version: { contractVersion }</span>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <EntriesList entries={ entries } />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
