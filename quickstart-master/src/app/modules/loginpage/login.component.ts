import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators } from '@angular/forms';
import {studentservice} from './../../services/studentservice'
import { Router, Route, Params } from '@angular/router';
import {GlobalEventsManager} from './../../services/global-event-managers'




@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',

    styleUrls: ['./login.component.css']

//   providers: [GlobalEventsManager]
})
export class Login implements OnInit  {

userform: FormGroup;
data:any;
userRole:any;
constructor( private _formbuilder:FormBuilder,private _studentservice:studentservice,private router:Router,private globalEventsManager:GlobalEventsManager){

}

ngOnInit(){
let clientUserString = localStorage.getItem('usersdetail');
let User = JSON.parse(clientUserString);
if(User){
this.userRole=User.roleid;

}
    this.userform=this._formbuilder.group(
        {
            'username' : [null, Validators.required],
            'password' : [null, Validators.required],
         
        }
    );
     this.globalEventsManager.isLoggedIn.emit(false);

}

onSubmit(form:any){
   
    this._studentservice.login(form.username, form.password).then((result)=>{this.data=result.json();
        
        if(this.data.status===false){
            alert("users donot exist");

        }else{
         
         localStorage.setItem('usersdetail',JSON.stringify(this.data[0]))
         this.globalEventsManager.isLoggedIn.emit(true);
         this.globalEventsManager.roleid.emit(this.data[0].roleid );

         if(this.data[0].roleid == 1){
         this.router.navigate(['getadminslist']);
         }else if(this.data[0].roleid == 2){
           this.router.navigate(['getadminUserslist',this.data[0].id]);  
         }else if(this.data[0].roleid ==3){
         this.router.navigate(['user']); 
         }
         
         }
        }
  );
}


} 