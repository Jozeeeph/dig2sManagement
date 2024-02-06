import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../services/event.service';
import { Event } from '../interfaces/Event'
import { reduce } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  events: Event[] = [];
  imageFile!: File;
  imageUrl!: string
  message: any;
  editevent: Event = {
    id: 0,
    event_name: '',
    description: '',
    date: '',
    location: '',
    link: '',
    eventImage: {  // Change 'image' to 'eventImage' and provide appropriate values
        id: 0,
        name: '',
        userImage: '' // Provide appropriate value (e.g., image URL)
    }
};

deleteevent: Event = {
    id: 0,
    event_name: '',
    description: '',
    date: '',
    location: '',
    link: '',
    eventImage: {  // Change 'image' to 'eventImage' and provide appropriate values
        id: 0,
        name: '',
        userImage: '' // Provide appropriate value (e.g., image URL)
    }
};


  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  onAddEvent(addForm: NgForm, imageFile: File): void {
    const event: Event = addForm.value;

    const formData = new FormData();
    formData.append('event', JSON.stringify(event));
    formData.append('file', imageFile);

    this.eventService.addEvents(formData).subscribe(
      (response: any) => {
        console.log("form:", response);
        this.getEvents();
        addForm.reset();
      },
      (error: any) => {
        console.error(error);
        addForm.reset();
      }
    );
  }

  onUpdateEvent(event: Event): void {
    this.eventService.updateEvents(event).subscribe(
      (response: Event) => {
        console.log(response);
        this.getEvents();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        
      }
    );
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const imageFile: File = fileList[0];
    }
  }


  public onOpenModal(event: Event, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addeventModal');
    }
    if (mode === 'edit') {
      this.editevent = event;
      button.setAttribute('data-target', '#updateeventModal');
    }
    if (mode === 'delete') {
      this.deleteevent = event;
      button.setAttribute('data-target', '#deleteeventModal');
    }
    container!.appendChild(button);
    button.click();
  }

  public onDeleteEvent(eventId: number): void {
    this.eventService.deleteEvents(eventId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEvents();
      },
      (error: HttpErrorResponse) => {
        console.log(error);

      }
    );
  }


  public getEvents(): void {
    this.eventService.getEvents().subscribe(
      (response: Event[]) => {
        this.events = response;
        console.log(this.events);

      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }



}
