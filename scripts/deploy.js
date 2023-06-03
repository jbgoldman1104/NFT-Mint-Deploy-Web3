
require('dotenv').config();

let wolf_nft_json = require('../build/contracts/WolfNFT.json');
let Web3 = require('web3');
const web3 = new Web3("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
const myWallet = process.env.WALLET_PUBLIC_KEY;
const privKey = process.env.WALLET_PRIVATE_KEY;

const deploy = async () => {
    const wolfContract = new web3.eth.Contract(wolf_nft_json.abi);
    deployTx = wolfContract.deploy({
        data: wolf_nft_json.bytecode,
        arguments: []
    });
    deployTx.estimateGas((err, gas) => {
        console.log("gas =", gas);
    })
    /*
    const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
    });*/
    const createTransaction = await web3.eth.accounts.signTransaction(
        {
            from: myWallet,
            data: deployTx.encodeABI(),
            gas: 3925192,
        },
        privKey
    );
    const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
    );
    console.log('Contract deployed at address', createReceipt.contractAddress);
}

deploy();
