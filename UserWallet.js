const EC = require('elliptic').ec;
const crypto = require('crypto');

class UserWallet {
    constructor() {
        this.keyPair = this.generateKeyPair();
        this.publicKey = this.keyPair.getPublic('hex');
        this.privateKey = this.keyPair.getPrivate('hex');
        this.walletId = this.generateWalletId();
        this.balance = 0;
        this.transactionHistory = [];
    }

    generateKeyPair() {
        const ec = new EC('secp256k1');     // secp256k1 là chuẩn curve sử dụng trong Bitcoin để tạo cặp khoá
        return ec.genKeyPair();
    }

    generateWalletId() {
        const hash = crypto.createHash('sha256');
        hash.update(this.publicKey);
        return hash.digest('hex');
    }

    // Tạo chữ ký số cho giao dịch
    signTransaction(transaction) {
        const key = new EC('secp256k1').keyFromPrivate(this.privateKey, 'hex');
        const signature = key.sign(transaction, 'base64');
        return signature.toDER('hex');
    }

    // Xác minh chữ ký số của giao dịch
    verifySignature(transaction, signature, publicKey) {
        const key = new EC('secp256k1').keyFromPublic(publicKey, 'hex');
        return key.verify(transaction, signature);
    }

    transfer(recipient, amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            recipient.balance += amount;

            const transaction = {
                sender: this.walletId,
                recipient: recipient.walletId,
                amount,
                timestamp: new Date().toISOString(),
            };
            this.transactionHistory.push(transaction);
            recipient.transactionHistory.push(transaction);

            return true;
        } else {
            return false;
        }
    }

    getBalance() {
        return this.balance;
    }

    getTransactionHistory() {
        return this.transactionHistory;
    }
}