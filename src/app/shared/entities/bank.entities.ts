export interface Bank {
    // nome
    name: string;

    // valor das ações
    stockAmount: number;

    // CDB
    depositaryReceiptAmount: number;

    // Poupança
    savingsAmount: number;

    treasuryBondsAmount: number;

    accountBalance: number;
}

export const banksExample = [
    { name: 'inter', stockAmount: 20, depositaryReceiptAmount: 33220.61, savingsAmount: 0, treasuryBondsAmount: 0, accountBalance: 301.83 },
    { name: 'bradesco', stockAmount: 0, depositaryReceiptAmount: 0, savingsAmount: 0, treasuryBondsAmount: 0, accountBalance: 0 },
    { name: 'easynvest', stockAmount: 2419.52, depositaryReceiptAmount: 0, savingsAmount: 1674.54, treasuryBondsAmount: 9275.14, accountBalance: 10.50 },
    { name: 'modal', stockAmount: 3338.87, depositaryReceiptAmount: 0, savingsAmount: 0, treasuryBondsAmount: 0, accountBalance: 16.03 },
] as Bank[];



export class BankList {
    constructor(public banks: Bank[]) {

    }

    private sum(selectField: (b: Bank) => number): number {
        let sum = 0;
        this.banks.forEach(b => sum += selectField(b));
        return sum;
    }

    get stockAmount() { return this.sum(b => b.stockAmount); }
    get depositaryReceiptAmount() { return this.sum(b => b.depositaryReceiptAmount); }
    get savingsAmount() { return this.sum(b => b.savingsAmount); }
    get treasuryBondsAmount() { return this.sum(b => b.treasuryBondsAmount); }
    get accountBalance() { return this.sum(b => b.accountBalance); }
    get fixedeIncomeAmount() {
        return this.depositaryReceiptAmount + this.savingsAmount + this.treasuryBondsAmount;
    }
    get variableIncomeAmount() {
        return this.stockAmount;
    }

    get total() {
        let sum = 0;
        this.banks.forEach(b => sum += (b.stockAmount + b.depositaryReceiptAmount + b.savingsAmount + b.treasuryBondsAmount + b.accountBalance));
        return sum;
    }
}