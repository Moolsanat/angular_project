import { Component, OnInit } from '@angular/core';
import { Router, Route, Params } from '@angular/router';
import {GlobalEventsManager} from './../../services/global-event-managers'




@Component({
  selector: 'user-page',
  templateUrl: './user.component.html',
//   providers: [GlobalEventsManager]
})
export class User{

 logggedIn:boolean=false;
 userRole:any;
 firstname:string;
 lastname:string;
constructor(private globalEventsManager:GlobalEventsManager){}
 ngOnInit(){   
    let clientUserString = localStorage.getItem('usersdetail');
    let User = JSON.parse(clientUserString);
    if(User){
        this.userRole=User.roleid;
        this.firstname=User.firstname;
        this.lastname=User.lastname;

    this.globalEventsManager.isLoggedIn.emit(true);
    }
}
}