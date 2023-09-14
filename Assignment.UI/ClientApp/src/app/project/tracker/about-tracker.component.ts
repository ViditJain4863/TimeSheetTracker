import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ 
    templateUrl: 'about-tracker.component.html',
    styleUrls: ['./tracker.component.css']

})
export class AboutTrackerComponent implements OnInit{ 
    @Input() pData:any="";
    @Output() childMessage=new EventEmitter();
    constructor(private route: ActivatedRoute,private router: Router){}
    
    ngOnInit(){
    } 

    
}