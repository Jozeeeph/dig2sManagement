import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authServiceGuardGuard } from './guard/auth-service-guard.guard';
import { ContactsComponent } from './contacts/contacts.component';
import { ContentComponent } from './content/content.component';
import { EventsComponent } from './events/events.component';
import { AdminsComponent } from './admins/admins.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {path:'dashboard',title:'dashboard',component:DashboardComponent,canActivate:[authServiceGuardGuard]},
  {path:"" , redirectTo:"content" , pathMatch:"full"},
  {path:'contacts',title:'listes de contacts',component:ContactsComponent},
  {path:'content',title:'content',component:ContentComponent},
  {path:'events',title:'listes des events',component:EventsComponent},
  {path:'tablesAdmins',title:'tablesAdmins',component:AdminsComponent},
  {path:'signin',title:'signin',component:SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
