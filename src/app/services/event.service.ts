import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/Event'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiServerUrl='http://localhost:8088'

  constructor(private http:HttpClient) {}

  public getEvents():Observable<Event[]>{
    return this.http.get<Event[]>(`${this.apiServerUrl}/events/all`);
  }

  public addEvents(formData: FormData):Observable<Event>{
    return this.http.post<Event>(`${this.apiServerUrl}/events/add`,formData);
  }

  public updateEvents(event:Event):Observable<Event>{
    return this.http.put<Event>(`${this.apiServerUrl}/events/update`,event);
  }

  public deleteEvents(eventId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/events/delete/${eventId}`);
  }
}
