var BlockHistorians = artifacts.require("./BlockHistorians.sol");

contract('BlockHistorians', accounts => {
  let instance;

  beforeEach(async () => {
    instance = await BlockHistorians.new();
  });

  it('should get the contract version', async () => {
    const version = await instance.getVersion.call();
    assert.equal('blockhistorians_v0.0.1', version, 'version did not match');
  });

  it('should be able to add historians', async () => {
    await instance.addHistorian({ from: accounts[0] });
    await instance.addHistorian({ from: accounts[1] });
    await instance.addHistorian({ from: accounts[2] });
    const numHistorians = await instance.numHistorians();
    assert.equal(3, numHistorians, 'number of historians didnt match');
  });

  it('should allow historians to propose a new proposal', async () => {
    await instance.addProposal(1234, { from: accounts[0] });
    const votes = await instance.getVotes.call(1234);
    const historian = await instance.getProposalHistorian.call(1234);
    assert.equal(0, votes, 'votes should be zero');
    assert.equal(accounts[0], historian, 'historian didnt match');
  });

  it('should allow historians to vote on new proposals', async () => {
    await instance.addHistorian({ from: accounts[0] });
    await instance.addHistorian({ from: accounts[1] });
    await instance.addHistorian({ from: accounts[2] });
    await instance.addHistorian({ from: accounts[3] });
    await instance.addHistorian({ from: accounts[4] });

    await instance.addProposal(0x1234, { from: accounts[0] });
    const votes = await instance.getVotes.call(1234);
    const historian = await instance.getProposalHistorian.call(0x1234);
    assert.equal(0, votes, 'votes should be zero');
    assert.equal(accounts[0], historian, 'historian didnt match');

    await instance.vote(0x1234, true, { from: accounts[0] });
    await instance.vote(0x1234, true, { from: accounts[1] });
    await instance.vote(0x1234, true, { from: accounts[2] });
    await instance.vote(0x1234, true, { from: accounts[3] });
    await instance.vote(0x1234, false, { from: accounts[4] });

    const entries = await instance.getEntries.call();
    assert.equal('0x1234000000000000000000000000000000000000000000000000000000000000', entries[0], 'hex didnt match');
  });

  it('should not allow same historian to vote twice', async () => {
    await instance.addHistorian({ from: accounts[0] });
    await instance.addHistorian({ from: accounts[1] });
    await instance.addHistorian({ from: accounts[2] });
    await instance.addHistorian({ from: accounts[3] });
    await instance.addHistorian({ from: accounts[4] });

    await instance.addProposal(0x1234, { from: accounts[0] });
    const votes = await instance.getVotes.call(1234);
    const historian = await instance.getProposalHistorian.call(0x1234);
    assert.equal(0, votes, 'votes should be zero');
    assert.equal(accounts[0], historian, 'historian didnt match');

    try {
      await instance.vote(0x1234, true, { from: accounts[0] });
      await instance.vote(0x1234, true, { from: accounts[0] });
    } catch(e) {
      return void assert(true, 'did not throw error');
    }

    return void assert(false, 'error should have been thrown');
  });

  it('should not add entires if votes dont reach threshold', async () => {
    await instance.addHistorian({ from: accounts[0] });
    await instance.addHistorian({ from: accounts[1] });
    await instance.addHistorian({ from: accounts[2] });
    await instance.addHistorian({ from: accounts[3] });
    await instance.addHistorian({ from: accounts[4] });

    await instance.addProposal(0x1234, { from: accounts[0] });
    const votes = await instance.getVotes.call(1234);
    const historian = await instance.getProposalHistorian.call(0x1234);
    assert.equal(0, votes, 'votes should be zero');
    assert.equal(accounts[0], historian, 'historian didnt match');

    await instance.vote(0x1234, true, { from: accounts[0] });
    await instance.vote(0x1234, true, { from: accounts[1] });
    await instance.vote(0x1234, false, { from: accounts[2] });
    await instance.vote(0x1234, false, { from: accounts[3] });
    await instance.vote(0x1234, false, { from: accounts[4] });

    const entries = await instance.getEntries.call();
    assert.equal(entries.length, 0, 'entry is not supposed to be added');
  });

  it('should get the right proposal historian', async () => {
    await instance.addHistorian({ from: accounts[0] });
    
    await instance.addProposal(0x1234, { from: accounts[0] });
    const historian = await instance.getProposalHistorian.call(0x1234);
    assert.equal(accounts[0], historian, 'historian did not match');
  });

});
