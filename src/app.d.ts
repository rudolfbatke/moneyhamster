import { DBSchema } from 'idb';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface ExpenseImport extends Expense {
		category: string;
	}

	type BackupData = {
		expenses: Expense[];
		categories: Category[];
		openListItems: string[];
		version: string;
	};

	interface ExpenseWithCategory extends Expense {
		category: Category;
	}

	declare interface Expense extends Entity {
		amount: number;
		date: string;
		issue: string;
		category: number;
	}

	type MonthExpenses = { [key: string]: Expense[] };

	type ExpenseInput = {
		issue: string;
		amount: number;
	};

	interface Category extends Entity {
		name: string;
		/** CSS color value*/
		color?: string;
	}

	interface Entity {
		id: number;
	}

	interface Migration extends Changelog {
		exec?: () => void;
	}

	interface Changelog {
		version: string;
		changes: string[];
	}

	type Month = string; // 2021-01
	type Year = string; // 2021
	type CategoryId = number;
	type Amount = number;
	type MonthlyAmount = {
		total: Amount;
		expenses: Expense[];
	};

	type MonthlyAmounts = { [key: Month]: MonthlyAmount };
	type CategoryMonthlyAmounts = { [key: CategoryId]: MonthlyAmounts };

	type DialogAction = 'close' | 'save' | 'delete' | 'duplicate';

	type openListItem = {
		title: string;
		component: ConstructorOfATypedSvelteComponent;
	};

	interface AppDB extends DBSchema {
		expenses: {
			value: Expense;
			key: number;
			indexes: { date: Date };
		};
		categories: {
			value: Category;
			key: number;
		};
	}
}

export {};
