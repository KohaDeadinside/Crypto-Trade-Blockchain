class SmartContract {
    // Thắng tìm hiểu phần này
    constructor() {
        this.data = 0;
    }

    set(value) {
        this.data = value;
    }

    get() {
        return this.data;
    }
}

module.exports = SmartContract;
