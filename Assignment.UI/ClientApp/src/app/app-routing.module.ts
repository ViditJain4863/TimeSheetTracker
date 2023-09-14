import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ProjectComponent } from './project/project.component';
import { TrackerComponent } from './project/tracker/tracker.component';


const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const projectModule = () => import('./project/project.module').then(x => x.ProjectModule);
const trackerModule = () => import('./project/tracker/tracker.module').then(x => x.TrackerModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'apps', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'project', loadChildren:projectModule, canActivate: [AuthGuard] },
    //{ path: 'tracker',loadChildren: trackerModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }