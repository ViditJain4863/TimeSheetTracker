import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { Ticket } from 'src/app/_models/ticket';
import { TicketService } from 'src/app/_services/ticket.service';

@Component({ templateUrl: 'timeline.component.html' })
export class TimeLineComponent implements OnInit {
  tickets?: Ticket[];
  user:any;
  constructor(private ticketService:TicketService, private acc:AccountService) { 
      this.user=this.acc.userValue;
    }

  ngOnInit(): void {
    this.ticketService.getAllTicket()
      .subscribe(tickets => this.tickets=tickets);
    console.log(this.tickets);//= projects.filter(x=>x.userName==this.user?.userName));
  }
}
