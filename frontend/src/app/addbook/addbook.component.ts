import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl, Validators} from '@angular/forms'
import {HttpClient} from '@angular/common/http'
import {bookinterface} from '../models/newbookmodel'
import { BooklistService } from '../booklist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent  {
title:string="Add Book"

book:bookinterface;
imageData:string;
  constructor(private booklistService:BooklistService ,private router:Router) { }
  form = new FormGroup({
    title: new FormControl(null,Validators.required),
    author: new FormControl(null,Validators.required),
    genre: new FormControl(null,Validators.required),
    image: new FormControl(null,Validators.required)
  })
  ngOnInit(): void {
  }
  get f (){
    return this.form.controls}
  onSubmit()
{
  this.booklistService.addBooks(this.form.value.title,this.form.value.author,this.form.value.genre,this.form.value.image)
  // this.form.reset();
  // this.imageData= null;
  // console.log(this.form.value.image)
  this.router.navigate(['allbook'])

}
onFileSelect(event:Event){
  const file= (event.target as HTMLInputElement).files[0]
  const allowedMimeTypes =[ "image/png","image/jpeg","image/jpg"]
  this.form.patchValue({image:file})
  if(file && allowedMimeTypes.includes(file.type) ){
    const reader = new FileReader();
    reader.onload=()=>{
      this.imageData = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

}
}
