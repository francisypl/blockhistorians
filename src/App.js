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
      proposals: [],
      curAccount: '',
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
      const { blockHistoriansInstance, web3 } = this.state;
      web3.eth.getAccounts((err, accounts) => {
        this.setState({curAccount: accounts[0]});
      });
      const version = await blockHistoriansInstance.getVersion();
      const entries = await blockHistoriansInstance.getEntries();
      const proposals = await blockHistoriansInstance.getProposals();
      this.setState({ contractVersion: version, entries, proposals });
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
    const { contractVersion, entries, proposals, curAccount } = this.state;
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Block Historians</a>
            <span className="pure-menu-heading pure-menu-link">Contract Version: { contractVersion }</span>
            <span className="pure-menu-heading pure-menu-link">Logged In As: { curAccount }</span>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <EntriesList title={ 'History' } entries={ entries } vote={ false }/>
              { curAccount && <EntriesList title={ 'Proposals' } entries={ proposals } vote={ true } /> }
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
