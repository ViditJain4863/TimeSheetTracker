import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../_models/project';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    user:any;
    constructor(private http: HttpClient, private acc:AccountService) { 
        this.user= this.acc.userValue;
    }    
    
    public getAllProject() {
        return this.http.get<Project[]>(`${environment.apiUrl}/api/Project`);
    }

    public getById(id: number) {
        return this.http.get<Project[]>(`${environment.apiUrl}/api/Project/`+id);
    }

    public registerProject(project: Project) : Observable<any> {
        project.userName = this.user.userName;
        return this.http.post<any>(`${environment.apiUrl}/api/Project`, project);
    }
    public deleteProject(id:number):Observable<number>{
        console.log("please confirm",id);
        console.log('${environment.apiUrl}/api/Project/${id}');
        return this.http.delete<number>(`${environment.apiUrl}/api/Project/`+id);
        //return this.http.delete<number>(`${environment.apiUrl}/api/Project`,{params:{id}});
    }
    public updateProject(data:any, id: number):Observable<any> {
        return this.http.patch<Project[]>(`${environment.apiUrl}/api/Project/${id}`,data);
    }
 
}