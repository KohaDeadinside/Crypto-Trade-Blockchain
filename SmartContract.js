class SmartContract {
    constructor() {
        this.balance = {}; // Lưu trữ số dư của các tài khoản
        this.transactions = []; // Lưu trữ lịch sử giao dịch
    }

    // Phương thức để tạo tài khoản mới
    createAccount(account) {
        if (!this.balance[account]) {
            this.balance[account] = 0;
        }
    }

    // Phương thức để kiểm tra số dư của một tài khoản
    getBalance(account) {
        return this.balance[account] || 0;
    }

    // Phương thức để thực hiện giao dịch chuyển tiền
    transfer(sender, recipient, amount) {
        if (this.balance[sender] >= amount) {
            this.balance[sender] -= amount;
            this.balance[recipient] = (this.balance[recipient] || 0) + amount;

            // Ghi lại thông tin giao dịch
            const transaction = {
                sender,
                recipient,
                amount,
                timestamp: new Date().toISOString(),
            };
            this.transactions.push(transaction);

            return true; // Giao dịch thành công
        } else {
            return false; // Không đủ tiền trong tài khoản nguồn
        }
    }

    // Phương thức để kiểm tra lịch sử giao dịch
    getTransactionHistory() {
        return this.transactions;
    }
}

// Sử dụng smart contract
const mySmartContract = new SmartContract();

// Tạo tài khoản
mySmartContract.createAccount('Alice');
mySmartContract.createAccount('Bob');

// Chuyển tiền từ Alice cho Bob
mySmartContract.transfer('Alice', 'Bob', 10);

// In số dư và lịch sử giao dịch
console.log('Alice Balance:', mySmartContract.getBalance('Alice'));
console.log('Bob Balance:', mySmartContract.getBalance('Bob'));
console.log('Transaction History:', mySmartContract.getTransactionHistory());
