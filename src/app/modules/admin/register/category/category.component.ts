import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CategoryService } from './category.service';

@Component({
    selector        : 'category',
    templateUrl     : './category.component.html',
    standalone      : true,
    styleUrls       : ['./category.component.scss'], 
    imports         : [  CommonModule, MatIconModule, MatButtonModule, RouterLink, RouterOutlet],
    providers       : [ CategoryService ]
})
export class CategoryComponent {


    
    constructor(private router: Router, private route: ActivatedRoute){
        
    }

    public add(){
        const isAdding = this.router.url.endsWith('/add')

        let route: string;
        if(isAdding){
            route = 'list'
        } else {
            route = 'add'
        }

        this.router.navigate([route], { relativeTo: this.route });
    }


    getTextAction(): string {
        const currentRoute = this.router.url;
        return currentRoute.endsWith('/add') ? 'list' : 'add';
    }


}