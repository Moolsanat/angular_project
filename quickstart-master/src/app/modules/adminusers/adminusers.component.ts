import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators } from '@angular/forms';
import {studentservice} from './../../services/studentservice'
import { Router, Route, Params,ActivatedRoute } from '@angular/router';
import {GlobalEventsManager} from './../../services/global-event-managers'




@Component({
  selector: 'admins-list',
  templateUrl: './adminusers.component.html',
//   providers: [studentservice]
})
export class AdminUsers implements OnInit  {
constructor( private router:Router,private studentservice:studentservice,private globalEventsManager:GlobalEventsManager,private route:ActivatedRoute){

    }
adminusers:any;
id:any;
user:any;
data:any;
roleid:any;

ngOnInit(){
    let clientUserString = localStorage.getItem('usersdetail');
    let User = JSON.parse(clientUserString);
    this.roleid = User.roleid;
    if(User){
    this.globalEventsManager.isLoggedIn.emit(true);
    }
    this.getadminlist();
}

    getadminlist(){
            this.studentservice.getadmins()
            .then(response => {
               this.adminusers=response;
               
            });

    }

    getusersforAdmin(id:any){
        this.router.navigate(['getadminUserslist',id]);
    }

    editData(id:any){
        this.studentservice.getUsersById(id).then((result)=>{this.user=result.json();
             });
        // this.studentservice.storeRowForEdit(id);
        this.router.navigate(['addusers',id]);

    }

        delete(id:any){
            this.studentservice.getUsersInAdminCount(id)
            .then((result)=>{this.data=result.json();
            if(this.data[0]['COUNT(created_by)'] === 0){
            this.studentservice.DeletebyId(id)
            .then((result)=>{this.data=result.json();
                console.log(this.data);
                this.getadminlist();
                //this.router.navigate(['getadminslist']);
                });
            }
            else{alert("Cannot Delete Admin. It Contains Users")}  
        });
        }
}
