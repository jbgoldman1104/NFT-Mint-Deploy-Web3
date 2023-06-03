require('dotenv').config();

const Web3 = require('web3');
const web3 = new Web3("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
const axios = require('axios');

const pinata_api_key = "e5e08d64baeead28a9c7";
const secret = "d1e7ecbfdcdd39ea8488408af67a973abcfda67ba72efe438cc0c0ef03a71a7f";
const myWallet = process.env.WALLET_PUBLIC_KEY;
const privKey = process.env.WALLET_PRIVATE_KEY;

let wolf_nft_json = require('../build/contracts/WolfNFT.json');
let wolfContractAddress = "0x882031b258829FC6ff0c950eD2F6e69B5d5066EF"

const mintNFT = async (count) => {
    let wolfContract = new web3.eth.Contract(wolf_nft_json.abi, wolfContractAddress);
    let metadata = require(`../metadata/${count}.json`);
    let tokenURI = await pinJSONToIPFS(metadata);
    const mintTransaction = await web3.eth.accounts.signTransaction({
        from: myWallet,
        to: wolfContractAddress,
        data: wolfContract.methods.mint(myWallet, tokenURI.pinataUrl).encodeABI(),
        gas: 3925192
    }, privKey);
    const receipt = await web3.eth.sendSignedTransaction(
        mintTransaction.rawTransaction
    );
    console.log("receipt = ", receipt);
}


const pinJSONToIPFS = async (JSONBody) => {
    console.log("pinata_api_key = ", pinata_api_key);
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: pinata_api_key,
                pinata_secret_api_key: secret
            }
        })
        .then((response) => {
            console.log("hash = " + response.data.IpfsHash);
            return {
                success: true,
                pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
            }
        })
        .catch(error => {
            console.error(error);
            return {
                success: false,
                message: error.message
            }
        })
}

/*
(async () => {
    for (let i = 1; i <= 10; i ++) {
        await mintNFT(i);
    }
})();
*/

(async () => {
    console.log("pinning");
    for (let i = 0; i <= 0; i ++) {
        let metadata = require(`../metadata/${i}.json`);
        let tokenURI = await pinJSONToIPFS(metadata);
        
        console.log("pinning");
        console.log("tokenURI = ", tokenURI);
    }
})();
