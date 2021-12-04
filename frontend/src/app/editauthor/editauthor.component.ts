import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthorlistService} from '../authorlist.service'
import {authorinterface} from '../models/newauthormodel'
import{AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editauthor',
  templateUrl: './editauthor.component.html',
  styleUrls: ['./editauthor.component.css']
})
export class EditauthorComponent implements OnInit {

  title:string="Edit Author"
 author = {
 name: '',
 countryname:'',
  genre:'',
 image:null,
 }
 // book:bookinterface[];
 
   constructor(private authorlistService :AuthorlistService, public router:Router) { }
   imageData:string;
   id:string;
   form = new FormGroup({
    name: new FormControl(null),
     countryname: new FormControl(null),
     genre: new FormControl(null),
     image: new FormControl(null)
   })
   private authorsSubscription : Subscription;
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
   onSubmit()
   {
     this.authorlistService.updateAuthors(this.id,this.form.value.name,this.form.value.countryname,this.form.value.genre,this.form.value.image)
     
     this.router.navigate(['authors'])
   
   }
 
   ngOnInit(): void {
     let authorId = localStorage.getItem("editAuthorId")
     this.authorlistService.getAuthor(authorId ).subscribe((authorData)=>{
     this.id=  (JSON.parse(JSON.stringify(authorData)))._id
       this.author=(JSON.parse(JSON.stringify(authorData)))
       
     })
   
   }
}
