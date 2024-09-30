import { Routes } from '@angular/router';
import { ProductComponent } from './Components/product/product.component';
import { CategoryComponent } from './Components/category/category.component';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'product',
        component: ProductComponent
    },
    {
        path:'category',
        component:CategoryComponent
    }
];
