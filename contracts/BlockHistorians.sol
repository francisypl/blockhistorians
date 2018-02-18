pragma solidity ^0.4.18;

import './SafeMath.sol';

contract BlockHistorians {
  using SafeMath for uint;  

  struct Proposal {
		address historian;
    uint votes;
    uint hashLocation;
    mapping(address => bool) voters;
	}

  address _owner;
  uint[] public entries;
  string[] public hashes;
  uint public hashCount;
  Proposal[] public proposals;
  mapping(address => bool) public historians;
  uint public numHistorians;

  function BlockHistorians() public {
    _owner = msg.sender;
  }

  function getVersion() public pure returns (string) {
    return 'blockhistorians_v0.1.0';
  }

  function getPassThreshold() public view returns (uint) {
    return numHistorians * 2 / 3;
  }

  function addHistorian() public {
    if (!historians[msg.sender]) {
      historians[msg.sender] = true;
      numHistorians = numHistorians.add(1);
    }
  }

  function addProposal(string proposal) public {
    // proposals[proposal] = Proposal(msg.sender, 0);
    hashes.push(proposal);
    proposals.push(Proposal(msg.sender, 0, hashCount));
    hashCount = hashCount.add(1);
  }

  function compareStrings (string a, string b) private pure returns (bool){
    return keccak256(a) == keccak256(b);
  }

  function vote(string proposal, bool isUpvote) public {
    uint propLoc;

    for (uint x = 0; x < proposals.length; x++) {
      if (compareStrings(hashes[proposals[x].hashLocation], proposal)) {
        propLoc = x;
        break;
      }
    }

    assert(!proposals[propLoc].voters[msg.sender]);
    proposals[propLoc].voters[msg.sender] = true;
    uint threshold = getPassThreshold();
    if (isUpvote) {
      proposals[propLoc].votes = proposals[propLoc].votes.add(1);
      if (proposals[propLoc].votes > threshold) {
        entries.push(proposals[propLoc].hashLocation);
      }
    } else {
      if (proposals[propLoc].votes > 0) {
        proposals[propLoc].votes = proposals[propLoc].votes.sub(1);
      }
    }
  }

  function getVotes(string proposal) public view returns (uint) {
    uint propLoc;
    for (uint x = 0; x < proposals.length; x++) {
      if (compareStrings(hashes[proposals[x].hashLocation], proposal)) {
        propLoc = x;
        break;
      }
    }
    return proposals[propLoc].votes;
  }

  function getProposalHistorian(string proposal) public view returns (address) {
    uint propLoc;
    for (uint x = 0; x < proposals.length; x++) {
      if (compareStrings(hashes[proposals[x].hashLocation], proposal)) {
        propLoc = x;
        break;
      }
    }
    return proposals[propLoc].historian;
  }

  function getEntries() public view returns (uint[]) {
    return entries;
  }

  function getHashAtIndex(uint index) public view returns (string) {
    return hashes[index];
  }

  function getProposals() public view returns (uint[]) {
    // string[] storage proposalHashes = new string[](proposals.length);
    uint[] memory proposalHashes = new uint[](proposals.length);
    for (uint x = 0; x < proposals.length; x++) {
      proposalHashes[x] = proposals[x].hashLocation;
    }
    return proposalHashes;
  }
}
