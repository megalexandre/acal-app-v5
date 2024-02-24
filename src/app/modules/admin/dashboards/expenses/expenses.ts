

export interface Expense {
    id: string,
    parentId?: string,
    value: number,
    reason: string,
    expenseType: string,
    createdAt: Date,
}

export interface Summary{
    title: string,
    value: string,
    description: string, 
    subtitle: string,
    subvalue: string,
}

