import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http'
import { AppComponent }  from './app.component';
import {student} from './modules/student.component'
import {studentservice} from './services/studentservice';
import {userdetails} from './Model/userdetails'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Login} from './modules/loginpage/login.component'
import {AddUsers} from './modules/users/addusers.component'
import {AdminUsers} from './modules/adminusers/adminusers.component'
import {AppRoutingModule} from './app-routing.module'
import {routingComponents} from './app-routing.module'
import {GlobalEventsManager} from './services/global-event-managers'
import {AdminUserUsers} from './modules/adminusers/adminuser-users.component'
import {User} from './modules/adminusers/user.component'
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';


const CONFORMATION_MODULE = ConfirmationPopoverModule.forRoot({
    confirmButtonType: 'danger' // set defaults here
});

@NgModule({
  imports:      [ BrowserModule,HttpModule,FormsModule,ReactiveFormsModule,AppRoutingModule,CONFORMATION_MODULE ],
  declarations: [ AppComponent, student, AddUsers,Login,AdminUsers,AdminUserUsers,User ],
  bootstrap:    [ AppComponent ],
  providers: [studentservice,userdetails,GlobalEventsManager]
})
export class AppModule { }
