import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../_services/alert.service';
import { ProjectService } from '../../_services/project.service';
import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';


@Component({ 
    templateUrl: 'monthly-tracker.component.html',
    styleUrls: ['./tracker.component.css']
})
export class MonthlyTrackerComponent implements OnInit {
    monthDisplay:any;
    yearDisplay:any = 2023;
    monthList:any=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    daysList:any=[];
    itemList:any=[];
    month:any;
    totalDays:any;


    id?: number;
    first:any;
    last:any;
    curr_first:any;
    changeMonth(monthValue:any){
        if(monthValue=="left"){
            if(this.month==0){
                this.month = 11;
                this.yearDisplay = this.yearDisplay-1;
            }
            else{
                this.month = this.month-1;
            }     
        }
        if(monthValue=="right"){
            if(this.month==11){
                this.month = 0;
                this.yearDisplay=this.yearDisplay+1;
            }
            else{
                this.month = this.month+1;
            } 
        }
        this.monthDisplay = this.monthList[this.month];
        var ddt= "01-"+this.monthDisplay+"-"+this.yearDisplay;
        var dd = new Date (ddt);
        this.fillMonthList(dd);
    }
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        var date=new Date(); 
        this.month =  date.getMonth();
        this.first =  date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
        this.curr_first = new Date(date.setDate(this.first)).toUTCString();
        this.monthDisplay = this.monthList[this.month];


        var ddt= "01-"+this.monthDisplay+"-"+this.yearDisplay;
        var dd = new Date (ddt);
        // console.log(ddt);
        // console.log (dd.getDay());
        // console.log(dd.getDate());
        // console.log(dd.getMonth());
        // console.log(new Date(date.setDate(date.getDate() - date.getDate()+1)));
        // console.log(date.getDay());
        
        

        //this.fillMonthList(date.getDay(), dd);
        this.fillMonthList(dd);
    }
    // fillMonthList(weekDay:any , date:any):any{
    fillMonthList(date:any):any{
        var weekDay = date.getDay();
        console.log(date.getDay());
        var count = 1;
        if(this.monthDisplay=='Jan'|| this.monthDisplay=='Mar'||this.monthDisplay=='May'||this.monthDisplay=='Jul'
            ||this.monthDisplay=='Aug'|| this.monthDisplay=='Oct'||this.monthDisplay=='Dec'){
                this.totalDays = 31;
        }
        else if(this.monthDisplay=='Apr'|| this.monthDisplay=='Jun'||this.monthDisplay=='Sep'||this.monthDisplay=='Nov'){
            this.totalDays = 30;
        }
        else{
            if (this.yearDisplay % 4 ==0){
                this.totalDays =  29;
            }
            else{
                this.totalDays = 28;
            };
        }
        this.daysList= [];
        for (let i = 1; i <= this.totalDays+weekDay;) {
            // console.log(this.totalDays);
            // console.log(i);
            // console.log(count);
            this.itemList = [];
            for(let j=i; j<7+i; ++j){ 
                if((count == 1 && j<=weekDay) || j-weekDay>this.totalDays){
                    //console.log('goes inside why??');
                    this.itemList.push('');
                }
                else{
                    this.itemList.push(j-weekDay);
                }
               
            }
            i=7+i;
            ++count;
            //console.log(this.itemList);
            this.daysList.push(this.itemList);
        }
       // console.log(this.daysList); 
    }
  
}