export interface ExpenseImport extends Expense {
  category: string;
}

export type ImportData = {
  expenses: Expense[];
  categories: Category[];
  version: string;
};

export type SaveAction = 'update' | 'create';

export interface CompleteExpense extends Expense {
  category: Category;
}

export interface Expense extends Entity {
  amount: number;
  date: string;
  issue: string;
  /** Category id */
  category: string;
}

export type ExpenseInput = {
  issue: string;
  amount: number;
};

export interface Category extends Entity {
  name: string;
  /** CSS color value*/
  color?: string;
}

export interface Entity {
  /** Unique identifier (nanoid(9)) */
  id: string;
}

export interface Migration extends Changelog {
  exec?: () => void;
}

export interface Changelog {
  version: string;
  changes: string[];
}

export type Month = `${Year}-${number}`; // 2021-01
export type Year = `${number}`; // 2021
export type CategoryId = number;
export type Amount = number;
export type MonthlyAmount = {
  total: Amount;
  expenses: Expense[];
};

export type MonthlyAmounts = Map<Month, MonthlyAmount>;
export type CategoryMonthlyAmounts = Map<CategoryId, MonthlyAmounts>;
