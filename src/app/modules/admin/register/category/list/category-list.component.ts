import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CategoryService } from '../category.service';
import { Category, CategoryPageFilter, CategoryTable } from '../category.types';
import { MatExpansionModule } from '@angular/material/expansion';


const modules = [ 
    CommonModule, 
    CdkScrollable,  
    MatMenuModule, 
    MatTableModule, 
    MatIconModule, 
    MatPaginatorModule, 
    MatSidenavModule,
    MatIconModule, 
    MatButtonModule,
    MatExpansionModule, 
    RouterLink,
    RouterOutlet,
]

@Component({
    selector        : 'category-list',
    templateUrl     : './category-list.component.html',
    standalone      : true,
    styleUrls       : ['./category-list.component.scss'], 
    imports         : [ ...modules],
    providers       : [ CategoryService ]
})
export class CategoryListComponent implements OnInit {
    

    @ViewChild(MatPaginator) 
    public paginator: MatPaginator;

    public isLoading = true;
    public displayedColumns: string[] = ['type','name', 'water', 'category', 'total', 'actions'];
    
    public pageSizeOption = [5, 10, 25, 50]
    public data: CategoryTable;
    public dataSource = new MatTableDataSource<Category>();
    
    public filter: CategoryPageFilter = {
        field: 'type',
        size: 10,
        offset: 0,
    }

    constructor(
        private _categoryService: CategoryService,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        ){
            
    }

    ngOnInit(): void {
       this.getData();
    }


    public getPage(pageEvent: PageEvent){
        this.filter.size = pageEvent.pageSize;
        this.filter.offset = pageEvent.pageIndex;
        this.getData();
    }

    public edit(id: string){
        console.log(id)
    }

    public delete(id: string){
        console.log(id)
    }

    private getData(){
        this._categoryService.paginate(this.filter).subscribe((data: CategoryTable)=>{
            this.data = data;
            this.dataSource = new MatTableDataSource<Category>(data.content);
            this.isLoading = false;
        })
    }


}