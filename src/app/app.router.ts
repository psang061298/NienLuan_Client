import {Routes, CanActivate} from '@angular/router';
import { BaseComponent } from './components/customer/base/base.component';
import { HeaderComponent } from './components/customer/header/header.component';
import { FooterComponent } from './components/customer/footer/footer.component';
import { HomeComponent } from './components/customer/home/home.component';
import { AboutusComponent } from './components/customer/aboutus/aboutus.component';
import { ContactComponent } from './components/customer/contact/contact.component';
import { CartComponent } from './components/customer/cart/cart.component';
import { CheckoutComponent } from './components/customer/checkout/checkout.component';
import { ProductsComponent } from './components/customer/products/products.component';
import { ProductDetailComponent } from './components/customer/product-detail/product-detail.component';
import { MainComponent } from './components/admin/main/main.component';
import { BaseAdminComponent } from './components/admin/base-admin/base-admin.component';
import { ProductListAdminComponent } from './components/admin/product-list-admin/product-list-admin.component';
import { CategoryListAdminComponent } from './components/admin/category-list-admin/category-list-admin.component';
import { ProductDetailAdminComponent } from './components/admin/product-detail-admin/product-detail-admin.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { UserComponent } from './components/customer/user/user.component';
import { BrandAdminComponent } from './components/admin/brand-admin/brand-admin.component';
<<<<<<< HEAD
import {AuthGuard} from './components/admin/auth/auth-login.guard';
=======
import { AuthGuard } from './services/guard/auth-login.guard';


>>>>>>> e8fd9749b2e40dce02bf21c5dfd6ff1c202ac6e3


import { Component } from '@angular/core';


export const appRoutes : Routes = [
    {
        path : "",
        redirectTo : "/index/home",
        pathMatch : "full"
    },
    {
        path : 'index',
        component : BaseComponent,
        children : [
            {
                path : 'home',
                component : HomeComponent,
            },{
                path : 'about',
                component : AboutusComponent,
            },{
                path : 'contact',
                component : ContactComponent,
            },{
                path : 'cart',
                component : CartComponent,
            },{
                path : 'checkout',
                component : CheckoutComponent,
            },{
                path : 'product',
                component : ProductsComponent,
            },{
                path : 'product/:id',
                component : ProductDetailComponent,
            },{
                path : 'user',
                component : UserComponent,
            }
        ],

    },
    {
        path : "admin",
        redirectTo : "/admin/dashboard",
        pathMatch : "full",
<<<<<<< HEAD
        canActivate: [AuthGuard]
=======
        canActivate : [AuthGuard],
>>>>>>> e8fd9749b2e40dce02bf21c5dfd6ff1c202ac6e3
    },
    {
        path : 'admin',
        component : BaseAdminComponent,
<<<<<<< HEAD
        canActivate: [AuthGuard],
=======
        canActivate : [AuthGuard],
>>>>>>> e8fd9749b2e40dce02bf21c5dfd6ff1c202ac6e3
        children : [
            {
                path : 'dashboard',
                component : MainComponent,
            },{
                path: 'category',
                component : CategoryListAdminComponent,
            },{
                path : 'product',
                component : ProductListAdminComponent
            },
            // {
            //     path : 'product/new/0',
            //     component : ProductAddAdminComponent
            // },
            {
                path : 'product/:id',
                component : ProductDetailAdminComponent
            },{
                path : 'user',
                component : UserListComponent,
            },{
                path : 'brand',
                component : BrandAdminComponent,
            }
        ]
    }
];