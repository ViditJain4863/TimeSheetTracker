import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { ConfigService } from './_services/config.service';


@Component({ selector: 'app-root', templateUrl: 'app.component.html',
styleUrls: ['./app.component.css'] })
export class AppComponent {
    logo:any;
  title:any;
    user?: User | null;

    constructor(private accountService: AccountService, private configService:ConfigService) {
        this.accountService.user.subscribe(x => this.user = x);
    }
    ngOnInit(){
        this.logo=this.configService.getLogo();
    this.title=this.configService.getTitle();
    }
    logout() {
        this.accountService.logout();
    }
}