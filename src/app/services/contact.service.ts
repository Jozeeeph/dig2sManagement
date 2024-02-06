import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/Contact';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiServerUrl='http://localhost:8088'

  constructor(private http:HttpClient) { }

  public getContacts():Observable<Contact[]>{
    return this.http.get<Contact[]>(`${this.apiServerUrl}/contact/all`);
  }
}
