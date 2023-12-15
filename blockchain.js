const SHA256 = require("crypto-js/sha256")
// import SHA256 from "crypto-js/sha256";

class CryptoBlock{
    constructor(index, data, previousHash = "", timestamp){
        this.index = index;
        this.data = data;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = this.computeHash();
        this.nonce = 0
    }

    computeHash(){
        return SHA256(this.index + JSON.stringify(this.data) + this.previousHash + this.timestamp + this.nonce).toString();
    }

    proofOfWork(difficulty){
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.computeHash();
        }
    }

    // printInfo() {
    //     console.log(`Block Index: ${this.index}`);
    //     console.log(`Nonce: ${this.nonce}`);
    //     console.log(`Hash: ${this.hash}`);
    //     console.log("=========================");
    // }
}

class CryptoBlockchain{
    constructor(){
        this.blockchain = [this.startGenesisBlock()];
        this.difficulty = 4;
    }
    
    startGenesisBlock(){
        return new CryptoBlock(0, "Initial Block in the chain", "0", Date.now());
    }

    obtainLatestBlock(){
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(newBlock){
        newBlock.previousHash = this.obtainLatestBlock().hash;
        newBlock.proofOfWork(this.difficulty);
        this.blockchain.push(newBlock);
    }

    checkChainValidity(){
        for (let i = 0; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const previousBlock = this.blockchain[i - 1];

            if(currentBlock.hash !== currentBlock.computeHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            return true;
        }
    }

    
}


// function runProofOfWork(difficulty) {
//     const block = new CryptoBlock(1, "Test Data", "", Date.now());
    
//     console.log("Mining started...");
//     console.log("Initial hash:", block.hash);

//     block.proofOfWork(difficulty);

//     console.log("Mining completed!");
//     console.log("Final hash:", block.hash);

//     block.printInfo();
// }

// runProofOfWork(5);


//Test chuc nang
// let theblockchaincoder = new CryptoBlockchain();
// console.log("theblockchaincoder mining in progress...");
// theblockchaincoder.addNewBlock(new CryptoBlock(
//     1,
//     {
//         sender: "Koha",
//         recipient: "Truong Pham",
//         quantity: 50
//     },
//     Date.now()
// ));

// theblockchaincoder.addNewBlock(new CryptoBlock(
//     2,
//     {
//         sender: "Koha",
//         recipient: "Thang Nguyen",
//         quantity: 100
//     },
//     Date.now()
// ));

// console.log(JSON.stringify(theblockchaincoder, null, 4));

module.exports = {CryptoBlock, CryptoBlockchain};