import { Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './list/category-list.component';
import { CategoryAddComponent } from './add/category-add.component';


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
            {
                path     : 'add',
                component: CategoryAddComponent,
            },
        
        ]
    },
] as Routes;
