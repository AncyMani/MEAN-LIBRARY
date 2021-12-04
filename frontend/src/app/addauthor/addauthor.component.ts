import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl, Validators} from '@angular/forms'
import {HttpClient} from '@angular/common/http'
import {authorinterface} from '../models/newauthormodel'
import {AuthorlistService} from '../authorlist.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-addauthor',
  templateUrl: './addauthor.component.html',
  styleUrls: ['./addauthor.component.css']
})
export class AddauthorComponent implements OnInit {
  title:string="Add Author"

  author:authorinterface;
  imageData:string;
    constructor(private authorlistService:AuthorlistService ,private router:Router) { }
    form = new FormGroup({
      name: new FormControl(null,Validators.required),
      countryname: new FormControl(null,Validators.required),
      genre: new FormControl(null,Validators.required),
      image: new FormControl(null,Validators.required)
    })
    ngOnInit(): void {
  
  
    }
    get f (){
      return this.form.controls}
    onSubmit()
  {
    
    this.authorlistService.addAuthors(this.form.value.name,this.form.value.countryname,this.form.value.genre,this.form.value.image)
    // this.form.reset();
    // this.imageData= null;
    this.router.navigate(['authors'])
  
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
