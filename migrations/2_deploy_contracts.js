var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var BlockHistorians = artifacts.require("./BlockHistorians.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(BlockHistorians);
};
