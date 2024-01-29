import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ExpensesComponent } from './expenses.component';
import { ExpensesService } from './expenses.service';

export default [
    {
        path     : '',
        component: ExpensesComponent,
        resolve  : {
            data: () => inject(ExpensesService).getData(),
        },
    },
] as Routes;
