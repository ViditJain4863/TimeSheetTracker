import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTicketComponent } from './add-ticket.component';
import { LayoutTicketComponent } from './layout-ticket.component';
import { TimeLineComponent } from './timeline.component';
import { AboutTrackerComponent } from '../tracker/about-tracker.component';
import { MonthlyTrackerComponent } from '../tracker/monthly-tracker.component';
import { WeeklyTrackerComponent } from '../tracker/weekly-tracker.component';

const routes: Routes = [
    {
        path: '', component: LayoutTicketComponent,
        children: [
            {path:'about', component:AboutTrackerComponent},
            { path: 'monthly', component: MonthlyTrackerComponent },
            { path: 'weekly', component: WeeklyTrackerComponent },
            { path: 'timeline' , component:TimeLineComponent},
            { path: 'ticket' , component:AddTicketComponent}
            // { path: 'edit/:id', component: AddEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrackerRoutingModule { }