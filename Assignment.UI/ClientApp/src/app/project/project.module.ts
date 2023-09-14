import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { AddProjectComponent } from './add-project.component';
import { LayoutProjectComponent } from './layout-project.component';
import { ProjectComponent } from './project.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProjectRoutingModule
    ],
    declarations: [
        LayoutProjectComponent,
        AddProjectComponent
    ]
})
export class ProjectModule { }