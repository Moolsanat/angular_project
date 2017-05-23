import { Component, OnInit } from '@angular/core';
import {AppComponent} from './../app.component'
import {studentservice} from './../services/studentservice'
import {GlobalEventsManager} from './../services/global-event-managers'
import { Router, Route, Params } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'my-student',
  templateUrl: './student.component.html',
//   providers: [studentservice]
})
export class student implements OnInit  { 
    test:any;
    student:any;
    user:any;
    data:any;

constructor(private studentservice: studentservice,private globalEventsManager:GlobalEventsManager,private router:Router) {

    }
title:String="Users List";

    ngOnInit() {
      console.log("getdata")
      this.getdata();
    let clientUserString = localStorage.getItem('usersdetail');
    let User = JSON.parse(clientUserString);
    if(User){
    this.globalEventsManager.isLoggedIn.emit(true);
}
    }


    getdata(){

            this.studentservice.test()
            .then(response => {
               this.student=response;
               console.log(this.student);
            });

    }

    editData(id:any){
        
         this.studentservice.getUsersById(id).then((result)=>{this.user=result.json();
        // this.router.navigate(['addusers']);
        // this.globalEventsManager.userdetail.emit(this.user); 
        // console.log(this.user);
             });
        // this.studentservice.storeRowForEdit(id);

        this.router.navigate(['addusers',id]);

    }

    delete(id:any){
           this.studentservice.DeletebyId(id)
           .then((result)=>{this.data=result.json();
            console.log(this.data);
          //  this.router.navigate(['getusers']);
            this.getdata();
            }
            );
        }



       
    
 }
