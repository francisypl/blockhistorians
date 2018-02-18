import IPFS from 'ipfs-mini';
import Promise from 'bluebird';

let ipfs = Promise.promisifyAll(new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }));

function uploadEntry(entry) {
  return ipfs.addAsync(JSON.stringify(entry));
}

function getContentWithHash(hash) {
  return ipfs.catAsync(hash);
}

export default {
  uploadEntry,
  getContentWithHash
};
