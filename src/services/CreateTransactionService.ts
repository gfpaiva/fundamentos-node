import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface NewTransatcionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: NewTransatcionDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    const isTransactionDebtBalance = type === 'outcome' && value > total;
    if (isTransactionDebtBalance) {
      throw Error(
        `This transaction cannot be made. Outcome value ($ ${value}) is bigger than the total in balance ($ ${total}).`,
      );
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
