import {Injectable} from '@angular/core';
import{ Http,Response,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { Router, Route, Params } from '@angular/router';


@Injectable()
export class studentservice{
    getstudentUrl:string="http://localhost:3081/";
    postUserdetailUrl:string = "http://localhost:3081/RegisterUser";
    loginpath:string = "http://localhost:3081/loginUsers";
     userById:string = "http://localhost:3081/getUsersById";
     deleteUrl:string = "http://localhost:3081/deleteUser";
     adminlistUrl:string="http://localhost:3081/admins";
     admin_userslistUrl:string="http://localhost:3081/admin_users";
    private _subject: Subject<any> = new Subject<any>();
    countUserUrl:string="http://localhost:3081/userCount";

    

constructor(private _http:Http,private router:Router){

}

    
    test() {
        return this._http.get(this.getstudentUrl)
            .toPromise()
            .then(response => response.json());
    }

    getadmins() {
        return this._http.get(this.adminlistUrl)
            .toPromise()
            .then(response => response.json());
    }


    postUserdetail(userdetail:any){
       
        var headers = new Headers();
         headers.append('Content-Type', 'application/json');
         //headers.append('Access-Control-Allow-Origin', '*');
        
        return this._http.post(this.postUserdetailUrl,JSON.stringify(userdetail), { headers: headers })
            .toPromise()
            .then(response => response.json());    
            //return response;
        }

    EditUserdetail(userdetail:any){
        var headers = new Headers();
         headers.append('Content-Type', 'application/json');
         //headers.append('Access-Control-Allow-Origin', '*');
         

        return this._http.post(this.postUserdetailUrl + '/' + userdetail.id ,JSON.stringify(userdetail), { headers: headers })
            .toPromise()
            .then(response => response.json());    
        }

    login(username:any, password:any) {
        var headers = new Headers();
         headers.append('Content-Type', 'application/json');
         //headers.append('Access-Control-Allow-Origin', '*');
         
         return this._http.post(this.loginpath,JSON.stringify({username:username, password:password}), { headers: headers })
                .toPromise()
                .then((response) => {
                response.json();
                
                return response;
                 }
            );  
            }  



  getUsersById(rowId:any) {
        var headers = new Headers();
         headers.append('Content-Type', 'application/json');
             return this._http.post(this.userById,JSON.stringify({rowId:rowId}), { headers: headers })
                .toPromise()
                .then((response) => {
                response.json();
                
                return response;
                 }
            );  
            } 

  getAdminuser_Users(rowId:any) {
        var headers = new Headers();
         headers.append('Content-Type', 'application/json');
             return this._http.post(this.admin_userslistUrl + '/'+ rowId,JSON.stringify({rowId:rowId}), { headers: headers })
                .toPromise()
                .then((response) => {
                response.json();
                
                return response;
                 }
            );  
            }     

      DeletebyId(rowId:any){
        var headers = new Headers();
         headers.append('Content-Type', 'application/json');
             return this._http.post(this.deleteUrl + '/' + rowId ,JSON.stringify({rowId:rowId}), { headers: headers })
                .toPromise()
                .then((response) => {
                response.json();
                console.log(response.status);
                return response;
                 }
            );  
            }

    getUsersInAdminCount(rowId:any) {
        var headers = new Headers();
         headers.append('Content-Type', 'application/json');
             return this._http.post(this.countUserUrl + "/"+ rowId,JSON.stringify({rowId:rowId}), { headers: headers })
                .toPromise()
                .then((response) => {
                response.json();
                console.log(response.status)
                return response;
                 }
            );  
            } 



   logout(): void {
       // this.showNavBar = false;

        localStorage.clear();
        this.router.navigate(['/login']);

    }

    storeRowForEdit(id:any) {
        
        this._subject.next(id);
    }

    getRowForEdit() {
        return this._subject.asObservable();
    }

  }

        
