import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import ContractHelper from './BlockHistoriansContractWrapper';
import EntriesList from './components/EntriesList';
import HistorianInput from './components/HistorianInput';
import Button from 'material-ui/Button';

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
      notification: '',
      addNew: false,
      web3: null
    }

    this.cancelAddView = this.cancelAddView.bind(this);
    this.sumbitNewEntry = this.sumbitNewEntry.bind(this);
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
      this.setState({ curAccount: blockHistoriansInstance.account });
      const version = await blockHistoriansInstance.getVersion();
      const entries = await blockHistoriansInstance.getEntries();
      const proposals = await blockHistoriansInstance.getProposals();
      this.setState({ contractVersion: version, entries, proposals });
    })
    .catch((e) => {
      console.log('Error finding web3.', e);
    });
  }

  async sumbitNewEntry(entryHash) {
    console.log('entryHash =>', entryHash);
    const { blockHistoriansInstance } = this.state;
    await blockHistoriansInstance.addProposal(entryHash);
    this.setState({ addNew: false, notification: 'Your Proposal is posted and currently being reviewed by your peer historians.' });
  }

  async instantiateContract() {
    const helper = new ContractHelper(this.state.web3);
    await helper.init();
    this.setState({ blockHistoriansInstance: helper });
    return helper;
  }

  cancelAddView() {
    this.setState({ addNew: false });
  }

  render() {
    const { contractVersion, entries, proposals, curAccount, addNew, notification } = this.state;
    const ListView = () => (
      <div className="pure-u-1-1">
        <EntriesList title={ 'History' } entries={ entries } vote={ false }/>
        { curAccount && <EntriesList title={ 'Proposals' } entries={ proposals } vote={ true } /> }
      </div>
    );
    const AddView = () => (
      <div className="pure-u-1-1">
        <HistorianInput 
          cancel={ this.cancelAddView }
          newEntry={ this.sumbitNewEntry }
        />
      </div>
    );
    const NotifyBanner = (props) => (
      <div style={{
        width: '100%',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'green',
        color: 'white'
      }}>{ props.text }</div>
    );

    return (
      <div className="App">
        <nav style={{ position: 'relative', top: '0px' }} className="navbar pure-menu pure-menu-horizontal">
          <a href="#" onClick={() => this.setState({ notification: false, addNew: false })} className="pure-menu-heading pure-menu-link">Block Historians</a>
          <span className="pure-menu-heading pure-menu-link">Contract Version: { contractVersion }</span>
          <span className="pure-menu-heading pure-menu-link">Logged In As: { curAccount }</span>
          {curAccount && <Button 
            style={{ float: 'right' }}
            variant='raised'
            color='primary'
            onClick={() => this.setState({addNew: true, notification: false})}>
            New
          </Button>}
        </nav>
        { notification ? <NotifyBanner text={ notification } /> : null }
        <main className="container">
          <div className="pure-g">
            { addNew ? <AddView /> : <ListView /> }
          </div>
        </main>
      </div>
    );
  }
}

export default App
