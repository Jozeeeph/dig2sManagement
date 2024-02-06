import { Component } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../interfaces/Contact';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contacts!:Contact[];

  constructor(private contactService:ContactService){}

  ngOnInit(): void {
    this.getContacts();
  }

  public getContacts():void{
    this.contactService.getContacts().subscribe(
      (response:Contact[])=>{
        this.contacts=response;
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
        
      }
    );
  }
}
