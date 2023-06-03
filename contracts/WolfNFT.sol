pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WolfNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("WolfNFT", "WFT") {

    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        super._setTokenURI(tokenId, _tokenURI);
    }

    function mint(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 nftId = _tokenIds.current(); 
        _mint(recipient, nftId);
        setTokenURI(nftId, tokenURI);

        return nftId;
    }
}