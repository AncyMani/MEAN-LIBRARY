import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

 

@Injectable({

  providedIn: 'root'

})

export class AuthService {

 

  constructor(private http:HttpClient) { }

 

  server_address:string='api';

  loginUser(user:any){

    return this.http.post<any>(`${this.server_address}/login`,user);

  }

  SignupUser(user:any){

    return this.http.post<any>(`${this.server_address}/signup`,user);

  }

 

  getToken(){

    return localStorage.getItem('token');

  }

  getToken2(){

    return localStorage.getItem('token1');

  }

  loggedAdmin(){

    return !! localStorage.getItem('token') ;

  }

  loggedUser(){

    return !!  localStorage.getItem('token1');

  }

 

 

 

}