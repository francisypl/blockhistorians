pragma solidity ^0.4.18;

import './SafeMath.sol';

contract BlockHistorians {
  using SafeMath for uint256;  

  struct Proposal {
		address historian;
    uint256 votes;
    mapping(address => bool) voters;
	}

  address _owner;
  bytes32[] public entries;
  mapping(bytes32 => Proposal) public proposals;
  mapping(address => bool) public historians;
  uint256 public numHistorians;

  function BlockHistorians() public {
    _owner = msg.sender;
  }

  function getPassThreshold() public view returns (uint256) {
    return numHistorians * 2 / 3;
  }

  function addHistorian() public {
    if (!historians[msg.sender]) {
      historians[msg.sender] = true;
      numHistorians = numHistorians.add(1);
    }
  }

  function addProposal(bytes32 proposal) public {
    proposals[proposal] = Proposal(msg.sender, 0);
  }

  function vote(bytes32 proposal, bool isUpvote) public {
    assert(!proposals[proposal].voters[msg.sender]);
    proposals[proposal].voters[msg.sender] = true;
    uint256 threshold = getPassThreshold();
    if (isUpvote) {
      proposals[proposal].votes = proposals[proposal].votes.add(1);
      if (proposals[proposal].votes > threshold) {
        entries.push(proposal);
      }
    } else {
      if (proposals[proposal].votes > 0) {
        proposals[proposal].votes = proposals[proposal].votes.sub(1);
      }
    }
  }

  function getVotes(bytes32 proposal) public view returns (uint256) {
    return proposals[proposal].votes;
  }

  function getProposalHistorian(bytes32 proposal) public view returns (address) {
    return proposals[proposal].historian;
  }

  function getEntries() public view returns (bytes32[]) {
    return entries;
  }
}
