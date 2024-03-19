import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Category } from '../../apps/academy/academy.types';
import { CategoryService } from './category.service';
import { CategoryPageFilter, CategoryTable } from './category.types';

@Component({
    selector        : 'category',
    templateUrl     : './category.component.html',
    standalone      : true,
    styleUrls       : ['./category.component.scss'], 
    imports         : [ MatTableModule, MatPaginatorModule,  CommonModule, MatIconModule, MatButtonModule, CdkScrollable,  RouterLink],
    providers       : [ CategoryService ]
})
export class CategoryComponent implements OnInit {

    @ViewChild(MatPaginator) 
    public paginator: MatPaginator;

    public totalElements = 0;
    public isLoading = false;
    public displayedColumns: string[] = ['type','name', 'water', 'category', 'total'];
    public pageSizeOption = [5, 10, 25, 50]
    public data: CategoryTable;
    public dataSource = new MatTableDataSource<Category>();
    
    public filter: CategoryPageFilter = {
        field: 'type',
        size: 10,
        offset: 0,
    }

    constructor(private categoryService: CategoryService){
        
    }

    ngOnInit(): void {
       this.getData();
    }

    public getPage(pageEvent: PageEvent){
        this.filter.size = pageEvent.pageSize;
        this.filter.offset = pageEvent.pageIndex;
        this.getData();
    }


    private getData(){
        this.categoryService.paginate(this.filter).subscribe((data: CategoryTable)=>{
            this.data = data;
            this.dataSource = new MatTableDataSource<Category>(data.content);
            this.totalElements = data.totalElements;
            this.isLoading = false;
        })
    }

}