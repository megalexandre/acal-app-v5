import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { expenses as expensesData } from 'app/mock-api/dashboards/expenses/data';
import { cloneDeep } from 'lodash-es';

@Injectable({providedIn: 'root'})
export class ExpensesMockApi
{
    private _expenses: any = expensesData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Sales - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/dashboards/expenses')
            .reply(() => [200, cloneDeep(this._expenses)]);
    }
}
