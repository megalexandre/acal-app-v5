import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CategoryService } from './category.service';

@Component({
    selector        : 'category',
    templateUrl     : './category.component.html',
    standalone      : true,
    styleUrls       : ['./category.component.scss'], 
    imports         : [ MatTableModule, MatPaginatorModule,  CommonModule, MatIconModule, MatButtonModule, CdkScrollable,  RouterLink, RouterOutlet],
    providers       : [ CategoryService ]
})
export class CategoryComponent {

    constructor(){
        
    }

}