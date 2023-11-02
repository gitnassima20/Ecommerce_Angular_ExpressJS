import { AuthInterceptor } from './../../../../libs/users/src/lib/services/auth.interceptor';
import { UsersModule } from './../../../../libs/users/src/lib/users.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListCategoryComponent } from './Pages/list-category/list-category.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewCategoryComponent } from './Pages/new-category/new-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCategoryComponent } from './Pages/edit-category/edit-category.component';
import { ListProductComponent } from './Pages/list-product/list-product.component';
import { NewProductComponent } from './Pages/new-product/new-product.component';
import { EditProductComponent } from './Pages/edit-product/edit-product.component';
import { AuthguardGuard } from './../../../../libs/users/src/lib/guards/authguard.guard';
import { UserpipePipe } from 'libs/shared/src/lib/pipes/userpipe.pipe';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';
import { ListUsersComponent } from './Pages/list-users/list-users.component';
import { NewUserComponent } from './Pages/new-user/new-user.component';
import { EditUserComponent } from './Pages/edit-user/edit-user.component';
import { ListOrderComponent } from './Pages/list-order/list-order.component';


@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    DashboardComponent,
    ListCategoryComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    ListProductComponent,
    NewProductComponent,
    EditProductComponent,
    UserpipePipe,
    PageNotFoundComponent,
    SidebarComponent,
    ProductDetailsComponent,
    ListUsersComponent,
    NewUserComponent,
    EditUserComponent,
    ListOrderComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    UsersModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    
  ],
  providers: [AuthguardGuard, {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
