export interface ExpenseImport extends Expense {
  category: string;
}

export type ImportData = {
  expenses: Expense[];
  categories: Category[];
  version: string;
};

export interface ExpenseWithCategory extends Expense {
  category: Category;
}

export interface Expense extends Entity {
  amount: number;
  date: string;
  issue: string;
  category: number;
}

export type MonthExpenses = { [key: string]: Expense[] };

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
  id: number;
}

export interface Migration extends Changelog {
  exec?: () => void;
}

export interface Changelog {
  version: string;
  changes: string[];
}

export type Month = string; // 2021-01
export type Year = string; // 2021
export type CategoryId = number;
export type Amount = number;
export type MonthlyAmount = {
  total: Amount;
  expenses: Expense[];
};

export type MonthlyAmounts = { [key: Month]: MonthlyAmount };
export type CategoryMonthlyAmounts = { [key: CategoryId]: MonthlyAmounts };

export type DialogAction = 'close' | 'save' | 'delete' | 'duplicate';
