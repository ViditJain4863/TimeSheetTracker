import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenResponse } from '../../_models/user';
import { AccountService } from '../../_services/account.service';

@Component({ 
    templateUrl: 'layout-tracker.component.html',
    styleUrls: ['./tracker.component.css']

})
export class LayoutTrackerComponent implements OnInit{ 

    values: string[] = ["Daily", "Weekly", "Monthly"];
    activePeriod: string = "Daily";
    user: TokenResponse | null;
    constructor(private route: ActivatedRoute,private router: Router,private accountService: AccountService){
        this.user = this.accountService.userValue;
    }
    
    ngOnInit(){
    } 

    setActivePeriod(value: string): void {
        this.activePeriod = value;
        console.log(value);
        //this.router.navigateByUrl('/projects');
        this.router.navigate(['../projects'])
      }
}