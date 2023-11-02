import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListCategoryComponent } from './Pages/list-category/list-category.component';
import { NewCategoryComponent } from './Pages/new-category/new-category.component';
import { EditCategoryComponent } from './Pages/edit-category/edit-category.component';
import { ListProductComponent } from './Pages/list-product/list-product.component';
import { NewProductComponent } from './Pages/new-product/new-product.component';
import { EditProductComponent } from './Pages/edit-product/edit-product.component';
import { AuthguardGuard } from 'libs/users/src/lib/guards/authguard.guard';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListOrderComponent } from './Pages/list-order/list-order.component';
import { ListUsersComponent } from './Pages/list-users/list-users.component';

export const appRoutes: Route[] = [
    {path: 'admin', component: DashboardComponent, canActivate:[AuthguardGuard]},
    {path: 'admin/categories', component: ListCategoryComponent, canActivate:[AuthguardGuard]},
    {path: 'admin/categories/add-category', component: NewCategoryComponent, canActivate:[AuthguardGuard]},
    {path: 'admin/categories/update-category/:id', component: EditCategoryComponent, canActivate:[AuthguardGuard]},
    {path: 'admin/products', component: ListProductComponent, canActivate:[AuthguardGuard]},
    {path: 'admin/products/add-product', component:NewProductComponent, canActivate:[AuthguardGuard]},
    {path: 'admin/products/update-product', component:EditProductComponent, canActivate:[AuthguardGuard]},
    {path: 'admin/orders', component: ListOrderComponent,  canActivate:[AuthguardGuard]},
    {path: 'admin/users', component: ListUsersComponent , canActivate:[AuthguardGuard]},
    {path: '**', component: PageNotFoundComponent}
    
   
];
