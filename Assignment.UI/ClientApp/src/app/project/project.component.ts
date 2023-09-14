import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/project';
import { first } from 'rxjs';
import { AlertService } from '../_services/alert.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {
usercheck(username: any) {

}
  projects?: Project[];
  user:any;
  constructor(private projectService:ProjectService, private alertService: AlertService, private route: ActivatedRoute,
    private router: Router, private acc:AccountService) { 
      this.user=this.acc.userValue;
    }

  ngOnInit(): void {
    this.projectService.getAllProject()
      .subscribe(projects => this.projects = projects.filter(x=>x.userName==this.user?.userName));
    
      //this.projects?.filter(x=>x.userName==this.user?.userName);
  }

  onDelete(id:any){
    console.log(id);
    this.projectService.deleteProject(id)
    .subscribe({
      next: () => {
          this.alertService.success('Project detail saved', { keepAfterRouteChange: true });
          this.router.navigateByUrl('/project');
      },
      error: (error: any) => {
          this.alertService.error(error);
          //this.submitting = false;
      }
    })
  }
}
