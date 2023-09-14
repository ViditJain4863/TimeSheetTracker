import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrackerComponent } from './tracker.component';
import { LayoutTrackerComponent } from './layout-tracker.component';
import { WeeklyTrackerComponent } from './weekly-tracker.component';
import { MonthlyTrackerComponent } from './monthly-tracker.component';
import { TrackerRoutingModule } from './tracker-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TrackerRoutingModule
    ],
    declarations: [
        LayoutTrackerComponent,
        WeeklyTrackerComponent,
        MonthlyTrackerComponent
    ]
})
export class TrackerModule { }