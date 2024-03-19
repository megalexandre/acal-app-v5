import { Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './list/category-list.component';


export default [
    {
        path     : '',
        title    : 'Categorias',
        component: CategoryComponent,
        children:[
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path     : 'list',
                component: CategoryListComponent,
            },
        ]
    },
] as Routes;
