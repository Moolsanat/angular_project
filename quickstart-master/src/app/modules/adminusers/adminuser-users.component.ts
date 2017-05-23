import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators } from '@angular/forms';
import {studentservice} from './../../services/studentservice';
import { Router, Route, Params,ActivatedRoute } from '@angular/router';
import {GlobalEventsManager} from './../../services/global-event-managers';


@Component({
  selector: 'admin-users',
  templateUrl: './adminuser-users.component.html',
//   providers: [studentservice]
})
export class AdminUserUsers implements OnInit  {
    adminuser_Users :any;
    id:any;
    data:any;
    user:any;
constructor( private router:Router,private studentservice:studentservice,private globalEventsManager:GlobalEventsManager,private route:ActivatedRoute){

    }

    ngOnInit(){
    let clientUserString = localStorage.getItem('usersdetail');
    let User = JSON.parse(clientUserString);
    if(User){
    this.globalEventsManager.isLoggedIn.emit(true);
    }
        this.id = this.route.snapshot.params['id'];
        this.getadmin_usersList(this.id);
    }


     getadmin_usersList(id:any){
            
            this.studentservice.getAdminuser_Users(id)
            .then(response => {
               
               this.adminuser_Users=response.json();
               
            });
         }

     delete(id:any){
           this.studentservice.DeletebyId(id)
           .then((result)=>{this.data=result.json();
            console.log(this.data);
           // this.router.navigate(['getadminUserslist',this.id]);
            this.getadmin_usersList(this.id);
            
            }
            );
        }

     editData(id:any){
        
         this.studentservice.getUsersById(id).then((result)=>{this.user=result.json();

             });

        this.router.navigate(['addusers',id]);

    }

}