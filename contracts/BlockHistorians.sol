pragma solidity ^0.4.18;

import './SafeMath.sol';

contract BlockHistorians {
  using SafeMath for uint256;  

  struct Proposal {
		bytes32 ipfsHash;
		address historian;
	}

  address _owner;
  bytes32[] public entries;
  Proposal[] public proposals;
  mapping(bytes32 => uint256) public votes;
  mapping(address => bool) public historians;
  uint256 public numHistorians;

  function BlockHistorians() public {
    _owner = msg.sender;
  }

  function getPassThreshold() public view returns (uint256) {
    return numHistorians * 2 / 3;
  }

  function addHistorian(address _addr) public {
    historians[_addr] = true;
  }

  function vote(bytes32 proposal, bool isUpvote) public {
    uint256 threshold = getPassThreshold();
    for (uint x = 0; x < proposals.length; x++) {
      if (proposals[x].ipfsHash == proposal) {
        if (isUpvote) {
          votes[proposal] = votes[proposal].add(1);
          if (votes[proposal] > threshold) {
            entries.push(proposal);
            delete votes[proposal];
            break;
          }
        } else {
          if (votes[proposal] > 0) {
            votes[proposal] = votes[proposal].sub(1);
          }
        }
      }
    }
  }

  function getVotes(bytes32 proposal) public view returns (uint256) {
    return votes[proposal];
  }

  function getEntities() public view returns (bytes32[]) {
    return entries;
  }

  function get() public pure returns (uint) {
    return 5;
  }
}
