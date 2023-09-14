import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tracker } from '../_models/tracker';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class TrackerService {
    user:any;
    constructor(private http: HttpClient, private acc:AccountService) { 
        this.user= this.acc.userValue;
    }    
    
    public getAllTracker() {
        return this.http.get<Tracker[]>(`${environment.apiUrl}/api/Tracker`);
    }

    public getById(id: number) {
        return this.http.get<Tracker[]>(`${environment.apiUrl}/api/Tracker/`+id);
    }

    public registerTracker(tracker: Tracker) : Observable<any> {
        tracker.userName = this.user.userName;
        return this.http.post<any>(`${environment.apiUrl}/api/Tracker`, Tracker);
    }
    public deleteTracker(id:number):Observable<number>{
        console.log("please confirm",id);
        console.log('${environment.apiUrl}/api/Tracker/${id}');
        return this.http.delete<number>(`${environment.apiUrl}/api/Tracker/`+id);
        //return this.http.delete<number>(`${environment.apiUrl}/api/Tracker`,{params:{id}});
    }
    public updateTracker(data:any, id: number):Observable<any> {
        return this.http.patch<Tracker[]>(`${environment.apiUrl}/api/Tracker/${id}`,data);
    }
 
}