import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
title:String="Log In"
User={username:'',
password:''};
Onsubmit(){
this.authService.loginUser(this.User)
.subscribe(res=>{
  if(res.token){
  localStorage.setItem('token',res.token)
    
  this.router.navigate(['/'])
  alert("success")
  }
  if(res.token1){
    localStorage.setItem('token1',res.token1)
    this.router.navigate(['/'])
    console.log("user");
  }
  else if(res.error=="Invalid User"){
    alert("Invalid User")
  }
 else  if(res.error=="Invalid password"){
    alert("Invalid Password")
  }
  
})
 
}
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

}