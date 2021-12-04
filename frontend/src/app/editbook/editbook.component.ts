import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooklistService } from '../booklist.service';
import {bookinterface} from '../models/newbookmodel'
import{AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {
title:string="Edit Book"
 book = {
title: '',
author:'',
 genre:'',
image:null,
}
// book:bookinterface[];

  constructor(private booklistService:BooklistService, public router:Router) { }
  imageData:string;
  id:string;
  form = new FormGroup({
    title: new FormControl(null),
    author: new FormControl(null),
    genre: new FormControl(null),
    image: new FormControl(null)
  })
  private booksSubscription : Subscription;
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
    this.booklistService.updateBooks(this.id,this.form.value.title,this.form.value.author,this.form.value.genre,this.form.value.image)
    
    this.router.navigate(['allbook'])
  
  }

  ngOnInit(): void {
    let bookId = localStorage.getItem("editBookId")
    this.booklistService.getBook(bookId ).subscribe((bookData)=>{
    this.id=  (JSON.parse(JSON.stringify(bookData)))._id
      this.book=(JSON.parse(JSON.stringify(bookData)))
      
    })
  
  }
 

}
