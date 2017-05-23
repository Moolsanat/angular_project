import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Login} from './modules/loginpage/login.component'
import { AppComponent }  from './app.component';
import {student} from './modules/student.component'
import {userdetails} from './Model/userdetails';
import {AddUsers} from './modules/users/addusers.component';
import {AdminUsers} from './modules/adminusers/adminusers.component';
import {AdminUserUsers} from './modules/adminusers/adminuser-users.component'
import {User} from './modules/adminusers/user.component'


const appRoutes: Routes = [

  {
    path: '',
    component: Login
  },
  {
    path: 'login',
    component: Login
  },
  
  {
    path: 'getusers',
    component: student
  }
  ,
  {
    path: 'addusers',
    component: AddUsers
  },
    {
    path: 'addusers/:id',
    component: AddUsers
  },
    {
    path: 'getadminslist',
    component: AdminUsers
  },

    {
    path: 'getadminUserslist',
    component: AdminUserUsers

  },
  

    {
    path: 'getadminUserslist/:id',
    component: AdminUserUsers

  },

    {
    path: 'user',
    component: User

  }
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule
       
    ]
})
export class AppRoutingModule{}
export const routingComponents = [ AppComponent, student, AddUsers,Login ];