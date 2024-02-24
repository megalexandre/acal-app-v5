import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ExpensePipe } from '@fuse/pipes/expense/expense.pipe';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { ExpensesService } from './expenses.service';
import { FuseCardComponent } from '@fuse/components/card/public-api';
import { SummaryComponent } from '@fuse/components/summary/public-api';
import { Expense, Summary } from './expenses';

@Component({
    selector       : 'expenses',
    templateUrl    : './expenses.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [ ExpensePipe, FuseCardComponent, SummaryComponent , TranslocoModule, MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule, NgApexchartsModule, MatTableModule, MatSortModule, NgClass, MatProgressBarModule, CurrencyPipe, DatePipe],
})
export class ExpensesComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('expensesTable', {read: MatSort}) expensesTableMatSort: MatSort;

    expensesDataSource: MatTableDataSource<any> = new MatTableDataSource();
    expensesTableColumns: string[] = [ 'reason', 'value', 'createdAt','id'] ;

    accumulated: number;
    
    
    summaries: Summary[]; 

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    
    constructor(private _financeService: ExpensesService) {
    }

    ngOnInit(): void {
        this._financeService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data: Expense[] ) =>
            {
                this.expensesDataSource.data = data;
                this.accumulated = data.reduce((sum, expense) => sum + expense.value, 0);
            });
    }

    ngAfterViewInit(): void {
        this.expensesDataSource.sort = this.expensesTableMatSort;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

}
