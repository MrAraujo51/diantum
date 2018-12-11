/*
 * @author: Manuel Araujo
 * Created on 2017-08-08 16:47:32
 */

import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        data: {
            title: 'Diantum'
        }
    },
    {   path: 'signin',
        component: SigninComponent,
        canActivate: [NotAuthGuard],
        data: {
            title: 'SignIn',
        }
    },
    {
        path: 'products',
        component: ProductComponent,
        data: {
            title: 'Diantum - Productos'
        }
    },
    {   path: '**', redirectTo: 'home'}
];

export const DIAN_ROUTING = RouterModule.forRoot(routes);

