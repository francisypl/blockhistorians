import BlockHistoriansContract from '../build/contracts/BlockHistorians.json'

export default class BlockHistoriansContractWrapper {
  constructor(web3) {
    this.web3 = web3;
  }

  async init() {
    const contract = require('truffle-contract');
    const blockHistorians = contract(BlockHistoriansContract);
    blockHistorians.setProvider(this.web3.currentProvider);
    this.instance = await blockHistorians.deployed();
  }

  async getVersion() {
    return await this.instance.getVersion.call();
  }

  async getEntries() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve([
          {
            date: 'date 1',
            text: 'news 1 aosndf',
            resource: ['https://i.imgur.com/vdKC9kr.jpg']
          }, 
          {
            date: 'date 2',
            text: 'news 2 lalala',
            resource: ['https://i.imgur.com/ygZ5PGA.jpg']
          },
          {
            date: 'date 3',
            text: 'news 3 foo bar',
            resource: ['https://i.imgur.com/eqphLAA.jpg']
          },
          {
            date: 'date 1',
            text: 'news 1 aosndf',
            resource: ['https://i.imgur.com/vdKC9kr.jpg']
          }, 
          {
            date: 'date 2',
            text: 'news 2 lalala',
            resource: ['https://i.imgur.com/ygZ5PGA.jpg']
          },
          {
            date: 'date 3',
            text: 'news 3 foo bar',
            resource: ['https://i.imgur.com/eqphLAA.jpg']
          }
        ]);
      }, 500);
    });
  }

  async getProposals() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve([
          {
            date: 'date 1',
            text: 'news 1 aosndf',
            resource: ['https://i.imgur.com/vdKC9kr.jpg']
          }, 
          {
            date: 'date 2',
            text: 'news 2 lalala',
            resource: ['https://i.imgur.com/ygZ5PGA.jpg']
          },
          {
            date: 'date 3',
            text: 'news 3 foo bar',
            resource: ['https://i.imgur.com/eqphLAA.jpg']
          },
          {
            date: 'date 1',
            text: 'news 1 aosndf',
            resource: ['https://i.imgur.com/vdKC9kr.jpg']
          }, 
          {
            date: 'date 2',
            text: 'news 2 lalala',
            resource: ['https://i.imgur.com/ygZ5PGA.jpg']
          },
          {
            date: 'date 3',
            text: 'news 3 foo bar',
            resource: ['https://i.imgur.com/eqphLAA.jpg']
          }
        ]);
      }, 500);
    });
  }
}