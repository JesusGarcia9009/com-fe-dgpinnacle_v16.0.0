import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    }, {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                //loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
                loadChildren: () => import('./modules/dashboard/dashboard.module').then(x => x.DashboardModule)
            },
            {
                path: '',
                loadChildren: () => import('./modules/users/users.module').then(x => x.UsersModule)
            }


            //,
            //{
            //    path: '',
            //    loadChildren: () => import('./modules/letter/letter.module').then(x => x.LetterModule)
            //},
            //{
            //    path: '',
            //    loadChildren: () => import('./modules/users/users.module').then(x => x.UsersModule)
            //}
        ]
    }, {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'auth',
            loadChildren: () => import('./modules/auth/auth.module').then(x => x.AuthModule)
        }]
    }
];
