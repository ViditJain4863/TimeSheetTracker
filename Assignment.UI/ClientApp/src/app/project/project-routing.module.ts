import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectComponent } from './project.component';
import { AddProjectComponent } from './add-project.component';
import { LayoutProjectComponent } from './layout-project.component';
import { TrackerComponent } from './tracker/tracker.component';
import { AuthGuard } from '../_helpers/auth.guard';
const trackerModule = () => import('./tracker/tracker.module').then(x => x.TrackerModule); 
const routes: Routes = [
    {
        path: '', component: LayoutProjectComponent,
        children: [
            { path: '', component: ProjectComponent },
            { path: 'add', component: AddProjectComponent },
            { path: 'edit/:id', component: AddProjectComponent },
            // { path: ':pId', component:TrackerComponent}
            { path: ':pId',loadChildren: trackerModule, canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule { }