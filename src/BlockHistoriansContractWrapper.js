import BlockHistoriansContract from '../build/contracts/BlockHistorians.json'
import ipfsFunctions from '../src/utils/getIpfsHash';
import Promise from 'bluebird';

export default class BlockHistoriansContractWrapper {
  constructor(web3) {
    this.web3 = web3;
  }

  async init() {
    const contract = require('truffle-contract');
    const blockHistorians = contract(BlockHistoriansContract);
    blockHistorians.setProvider(this.web3.currentProvider);
    this.instance = await blockHistorians.deployed();
    const accounts = await Promise.promisify(this.web3.eth.getAccounts)();
    this.account = accounts[0];
    await this.addHistorian();
  }

  async getVersion() {
    return await this.instance.getVersion.call();
  }

  async getEntries() {
    // below is mock function
    const entries = await this.instance.getEntries.call();
    console.log('entries =>', entries);

    const indexPromises = entries.map(entry => {
      return this.instance.getHashAtIndex(entry);
    });
    const hashes = await Promise.all(indexPromises);
    const content = hashes.map(hash => {
      return ipfsFunctions.getContentWithHash(hash);
    });

    return await Promise.all(content).map(single => JSON.parse(single));
  }

  async addHistorian() {
    return await this.instance.addHistorian({ from: this.account });
  }

  async addProposal(hash) {
    console.log('addProposal: hexHash =>', hash);
    return await this.instance.addProposal(hash, { from: this.account });
  }

  async vote(hash, isUpvote) {
    console.log('vote: hexHash =>', hash, isUpvote);
    return await this.instance.vote(hash, isUpvote, { from: this.account });
  }

  async getProposals() {
    const proposals = await this.instance.getProposals.call();
    console.log('proposals =>', proposals);

    const indexPromises = proposals.map(entry => {
      return this.instance.getHashAtIndex(entry);
    });
    const hashes = await Promise.all(indexPromises);
    const content = hashes.map(hash => {
      return ipfsFunctions.getContentWithHash(hash);
    });
    const data = Promise.all(content);

    return data.map((single, index) => {
      const piece = JSON.parse(single);
      piece.hash = hashes[index];
      return piece;
    });
  }

  // async getProposals() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       return resolve([
  //         {
  //           date: 'date 1',
  //           text: 'news 1 aosndf',
  //           resource: ['https://i.imgur.com/vdKC9kr.jpg'],
  //           hash: 'QmQFdyANXLmgxZPbGparNQ2evpygomjt2j1QMDU2SnSzcQ'
  //         },
  //         {
  //           date: 'date 2',
  //           text: 'news 2 lalala',
  //           resource: ['https://i.imgur.com/ygZ5PGA.jpg'],
  //           hash: ''
  //         },
  //         {
  //           date: 'date 3',
  //           text: 'news 3 foo bar',
  //           resource: ['https://i.imgur.com/eqphLAA.jpg'],
  //           hash: ''
  //         }
  //       ]);
  //     }, 500);
  //   });
  // }
}

// async getEntries() {
//   const entries = this.instance.getEntries().call();
//   // for each entry hash get the data from ipfs
//   // package data to look like
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       return resolve([
//         {
//           date: 'date 1',
//           text: 'news 1 aosndf',
//           resource: ['https://i.imgur.com/vdKC9kr.jpg']
//         }, 
//         {
//           date: 'date 2',
//           text: 'news 2 lalala',
//           resource: ['https://i.imgur.com/ygZ5PGA.jpg']
//         },
//         {
//           date: 'date 3',
//           text: 'news 3 foo bar',
//           resource: ['https://i.imgur.com/eqphLAA.jpg']
//         },
//         {
//           date: 'date 1',
//           text: 'news 1 aosndf',
//           resource: ['https://i.imgur.com/vdKC9kr.jpg']
//         }, 
//         {
//           date: 'date 2',
//           text: 'news 2 lalala',
//           resource: ['https://i.imgur.com/ygZ5PGA.jpg']
//         },
//         {
//           date: 'date 3',
//           text: 'news 3 foo bar',
//           resource: ['https://i.imgur.com/eqphLAA.jpg']
//         }
//       ]);
//     }, 500);
//   });
// }