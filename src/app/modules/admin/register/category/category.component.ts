import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
export class CategoryComponent implements OnInit, AfterViewInit {

    public totalElements: number = 0;

    @ViewChild(MatPaginator) 
    public paginator: MatPaginator;

    public loaded = false;
    public displayedColumns: string[] = ['type','name', 'water', 'category', 'total'];
    public data: CategoryTable;
    public dataSource = new MatTableDataSource<Category>();
    
    public filter: CategoryPageFilter = {}


    constructor(private categoryService: CategoryService){
        
    }

    ngAfterViewInit(): void {
        this.categoryService.paginate(this.filter).subscribe((data: CategoryTable)=>{
            this.data = data;
            this.dataSource = new MatTableDataSource<Category>(data.content);
            this.dataSource.paginator = this.paginator; 
            this.totalElements = data.totalElements;    
            this.loaded = true;
        })
    }

    ngOnInit(): void {

    }

}