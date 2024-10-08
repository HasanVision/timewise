import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from '../app/guards/auth.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { MagicLinkComponent } from './magic-link/magic-link.component';


export const routes: Routes = [
    { path : '', component: LayoutComponent, 
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'forgot-password', component: ForgotPasswordComponent},
            {path: 'new-password', component: ResetPasswordComponent},
            { path: 'magic-link', component: MagicLinkComponent },
        ]
    }
];
