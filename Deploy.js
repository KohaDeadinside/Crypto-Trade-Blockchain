//import
const {CryptoBlock, CryptoBlockchain} = require('./blockchain');
// import SmartContract from './SmartContract';

//khai bao doi tuong
const blockchain = new CryptoBlockchain(); 
// const smartContract = new smartContract();

// blockchain.addContract('SimpleStorage', smartContract);

/////////////////// chay thu blockchain //////////////////////

console.log("theblockchaincoder mining in progress...");

//add block 1
blockchain.addNewBlock(new CryptoBlock(
    1,
    {
        sender: "Koha",
        recipient: "Truong Pham",
        quantity: 50
    },
    Date.now()
));

//add block 2
blockchain.addNewBlock(new CryptoBlock(
    2,
    {
        sender: "Koha",
        recipient: "Thang Nguyen",
        quantity: 100
    },
    Date.now()
));

console.log(JSON.stringify(blockchain, null, 4));
