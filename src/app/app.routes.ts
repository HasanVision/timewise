import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from '../app/guards/auth.guard';


export const routes: Routes = [
    { path : '', component: LayoutComponent, 
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent}
        ]
    }
];
