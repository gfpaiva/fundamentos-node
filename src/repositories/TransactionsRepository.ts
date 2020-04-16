import Transaction from '../models/Transaction';

interface NewTransatcionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeBalance = this.transactions.reduce(
      (prev, { type, value }) => (type === 'income' ? prev + value : prev),
      0,
    );
    const outcomeBalance = this.transactions.reduce(
      (prev, { type, value }) => (type === 'outcome' ? prev + value : prev),
      0,
    );
    const total = incomeBalance - outcomeBalance;

    return {
      income: incomeBalance,
      outcome: outcomeBalance,
      total,
    };
  }

  public create(data: NewTransatcionDTO): Transaction {
    const transaction = new Transaction(data);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
