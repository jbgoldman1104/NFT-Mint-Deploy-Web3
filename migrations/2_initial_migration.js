const WolfNFT = artifacts.require("WolfNFT");

module.exports = function (deployer) {
  deployer.deploy(WolfNFT);
};
