import { Component,OnInit,Input } from '@angular/core';
//import {AppComponent} from './../app.component'
import {studentservice} from './../../services/studentservice'
import {userdetails} from './../../Model/userdetails'
import {GlobalEventsManager} from './../../services/global-event-managers'
import { Router, Route, Params, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'add-users',
  templateUrl: './addusers.component.html',
   //providers: [GlobalEventsManager]
})
export class AddUsers implements OnInit  {
firstname:String;
users:any;
userId:number;
adminusers:any;
testuserdetail:any;
roleid:any;
adminid:any;
  @Input() userdetail: userdetails; 

    constructor(private router:Router,private route:ActivatedRoute,private studentservice:studentservice,private globalEventsManager:GlobalEventsManager){

    }

ngOnInit(){
     var currentdate = new Date();
     var correctDateTime = currentdate.getFullYear() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getDate();

    let clientUserString = localStorage.getItem('usersdetail');
    let User = JSON.parse(clientUserString);
    this.roleid=User.roleid;
    this.adminid=User.id;
    if(User){
    this.globalEventsManager.isLoggedIn.emit(true);
    }
    this.userId = this.route.snapshot.params['id'];
    
    this.getadminlist();
    //   this.globalEventsManager.userdetail.subscribe((result:any) => {
    //   console.log('result is here'); 
    //   console.log(result); 
    // });
    // this.studentservice.getRowForEdit().subscribe((result:any) => {
    //   this.users = result;
    //   console.log("result finnally");
    //   console.log(this.users);
    // });
    this.userdetail = new userdetails;
    this.userdetail.created_date= correctDateTime;
    if(this.userId){
         this.studentservice.getUsersById(this.userId).then((result)=>{
         this.users=result.json();
         
        this.userdetail = this.users[0];
}
         );
    }
      
 
}

saveuser(){
    
    if(this.users){
   // if(this.users[0].id){
    this.studentservice.EditUserdetail(this.userdetail).then((result:any)=>{
        
  
            if(this.roleid === 1){
            this.router.navigate(['getadminslist']);
            }
             if(this.roleid === 2){
            this.router.navigate(['getadminUserslist',this.adminid]);
            }
      
    });
   
    }else{
    
     if(this.roleid === 2){
         this.userdetail.role = "3";
           this.userdetail.created_by= this.adminid;
            }
            this.studentservice.postUserdetail(this.userdetail).then((result:any)=>{
             if(this.roleid === 1){
            this.router.navigate(['getadminslist']);
            }
             if(this.roleid === 2){
            this.router.navigate(['getadminUserslist',this.adminid]);
            }
          });
    }


}

    getadminlist(){

            this.studentservice.getadmins()
            .then(response => {
               this.adminusers=response;
               
            });

    }

} 