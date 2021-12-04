import { Component, OnInit } from '@angular/core';
import{AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {createPasswordStrengthValidator} from './validate'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent   {
title:String="Sign Up"


  constructor(private fb:FormBuilder,private authService:AuthService, private router:Router) { }
   registerForm =this.fb.group({
    name:new FormControl('',[Validators.required,Validators.minLength(3)]),
    email:new FormControl('',[Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),Validators.required]),
    password:new FormControl('',[Validators.required,createPasswordStrengthValidator(),Validators.minLength(8)]),
    password1:new FormControl('',[Validators.required])
  },
  {validators:this.MustMatch('password','password1') 
 }
   )
  //, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') 

  get f (){
    return this.registerForm.controls}
  MustMatch(controlName:string,matchingControlName:string){
    return(formGroup:FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName]
      if(matchingControl.errors && ! matchingControl.errors.MustMatch){
   return 
      }
      if(control.value!==matchingControl.value){
        matchingControl.setErrors({MustMatch:true})
      }
      else{
        matchingControl.setErrors(null)
      }
    }
  }
  User={username:'',
  password:''};
  
   numberCheck(control:AbstractControl):{[key:string]:any} | null{
    const numb: string= control.value;
    const regex = new RegExp('(?=.*[a-z])');
    if(regex.test(numb)){
      return  null;
    }
    else{
      return {'numberCheck':true};
    }
  }
  

  OnRegister(){
    this.authService.SignupUser(this.User)
.subscribe(res=>{
  if(res.token){
  localStorage.setItem('token2',res.token)
    
  this.router.navigate(['/'])
  }
  else if(res.error=="User Already exists"){
    alert("User Already exists")
  }
  else if(res.error=="new User"){
    alert(" new user")
    this.router.navigate(['login'])
  }
   else{
    alert("Invalid credentials")
  }
})

  }
  
  ngOnInit(): void {
  }


}

