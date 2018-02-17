# DAO Proposal: BlockHistorians
BlockHistorians is a DAO for historians to vote, agree on and write current events on to the blockchain.

## Problem
The unfortunate truth of today's world is that our abundance of biased information have put us in a bubble. You are living in a completely different reality if you are watching Fox News than if you listen to NPR everyday. With such biased journalism, how can we be sure that our history is written accurately and truthfully? How can we trust centralized history textbook publishers to record and recite our history?

## Solution
To ensure a trustworthy record of our history, we must store the truth on the blockchain. To form our group of historians in the DAO, a KYC process will help select trustworthy historians who are willing to stake their reputation. The KYC process will also take into account:
Fair distribution of historians geographically: we want to have historians around the world confirming and validating
Proportionate number of historians per unit of population: the more populated an area, the more historians should be selected
Reputation & Track Record: the historian selected should be educated, have a good reputation and a have stake in their community

### Protocol
To record the a new historical entry, a historian will first propose an entry with the following format:
``` js
{
	date: <string>,
	text:<string>,
	resources: [<string>]
}
```
The entry is then broadcasted to historians in the order of geological proximity where each historian can upvote or downvote the entry. For the entry to be recorded onto the blockchain, upvote counts must reach a threshold (set by the DAO that is at least larger that 51%) .
