import { Injectable } from '@angular/core';
import { Admins } from '../interfaces/Admins';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  private apiServerUrl='http://localhost:8088'

  constructor(private http:HttpClient) {}

  public getAdmins():Observable<Admins[]>{
    return this.http.get<Admins[]>(`${this.apiServerUrl}/admins/all`);
  }

  public addAdmins(admin:Admins):Observable<Admins>{
    return this.http.post<Admins>(`${this.apiServerUrl}/admins/add`,admin);
  }

  public updateAdmins(admin:Admins):Observable<Admins>{
    return this.http.put<Admins>(`${this.apiServerUrl}/admins/update`,admin);
  }

  public deleteAdmins(admintId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/admins/delete/${admintId}`);
  }
}
