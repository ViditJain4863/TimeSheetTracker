import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../_services/alert.service';
import { ProjectService } from '../../_services/project.service';
import { DatePipe } from '@angular/common';
import { Ticket } from 'src/app/_models/ticket';
import { TicketService } from 'src/app/_services/ticket.service';


@Component({ 
    templateUrl: 'weekly-tracker.component.html' ,
    styleUrls:['./weekly-tracker.component.css'] 
})
export class WeeklyTrackerComponent implements OnInit {
    str?:string;
    form!: FormGroup;
    id?: number;
    curr:any;
    curr_first:any;
    curr_last:any;
    prev_first:any;
    prev_last:any;
    next_first:any;
    next_last:any;
    first:any;
    last:any;
    nextFirst:any;
    prevLast:any;
    selectedValue:any;
    startOfTheWeek:any;
    tickets?: Ticket[];
    
    changeValue(e:any){
        console.log(e.target.value);
        this.selectedValue = e.target.value;
      }
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private projectService: ProjectService,
        private alertService:AlertService,
        private ticketService:TicketService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        
        var date=new Date();
        this.curr= Date.now();
        this.first =  date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
        this.last =  this.first+6;  // last day is the first day + 6

        this.curr_first = new Date(date.setDate(this.first)).toUTCString();
        this.curr_last = new Date(date.setDate(this.first+6)).toUTCString();
        
        this.nextFirst = this.first+7;
        this.next_first = new Date(date.setDate(this.nextFirst)).toUTCString();
        this.next_last = new Date(date.setDate(this.nextFirst+6)).toUTCString();

        this.prevLast = this.first-1;
        this.prev_last = new Date(date.setDate(this.prevLast)).toUTCString();
        this.prev_first = new Date(date.setDate(this.prevLast-6)).toUTCString();

        this.selectedValue = "currWeek";
        this.ticketService.getAllTicket().subscribe(tickets => this.tickets=tickets);
        //console.log(this.tickets);//= projects.filter(x=>x.userName==this.user?.userName))

    }
    

    onSubmitStatus() {}

    onSaveStatus(){
        console.log( "TextAreaComponent::str: " + this.str);
    }

    onReset(x:any){
        var id = "text"+x;
        console.log(id);
        
    }

    public getWeekDays(): Date[] {
        const dateList: Date[] = [];
        if(this.selectedValue =="currWeek") {
            this.startOfTheWeek = this.curr_first;
        }
        else if(this.selectedValue == "prevWeek"){
            this.startOfTheWeek =  this.prev_first;
        }
        else{
            this.startOfTheWeek = this.next_first;
        }
        for (let i = 0; i <= 6; i++) {
          const newDate = new Date(this.startOfTheWeek);
          newDate.setDate(newDate.getDate() + i);
          dateList.push(newDate);
        }   
        return dateList;
      }

    

}