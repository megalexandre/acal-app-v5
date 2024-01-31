

export interface Expense {
    id: string,
    parentId?: string,
    value: number,
    reason: string,
    expenseType: string,
    createdAt: Date,
}

