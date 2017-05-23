import { Component } from '@angular/core';
import {studentservice} from './services/studentservice'
import {GlobalEventsManager} from './services/global-event-managers'

@Component({
  selector: 'my-app',
  // template: `<h1>Hello {{name}}</h1>`,
  templateUrl: './app.component.html',
 // providers:[GlobalEventsManager]
})
export class AppComponent  { name = 'Angular';
 pageTitle: string = 'New Project';
 logggedIn:boolean=false;
 userRole:any;
 firstname:string;
 lastname:string;
 primaryid:any;
 constructor(private _service:studentservice,private globalEventsManager:GlobalEventsManager){
 }

 ngOnInit(){
  
    this.globalEventsManager.isLoggedIn.subscribe((isLoggedIn:boolean) => {
    this.logggedIn = isLoggedIn;
    });
    this.globalEventsManager.roleid.subscribe((roleid:any) => {
    this.userRole = roleid;
    });
    let clientUserString = localStorage.getItem('usersdetail');
    let User = JSON.parse(clientUserString);
    if(User){
    this.userRole=User.roleid;
    this.firstname=User.firstname;
    this.lastname=User.lastname;
    this.primaryid=User.id;
  }

}

  logOut(){
    this._service.logout();
    this.globalEventsManager.isLoggedIn.emit(false);

    this.userRole = undefined;

  }
}
