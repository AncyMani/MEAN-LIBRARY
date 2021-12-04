import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

import {AuthorlistService} from '../authorlist.service'
// import { ListService } from '../list.service';

import {authorinterface} from '../models/newauthormodel'

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit , OnDestroy {
  title:string="Authors"
  authors:authorinterface[]=[];
  private authorsSubscription : Subscription;
  
    constructor(public auth:AuthService , public router:Router ,private authorlistService:AuthorlistService) { }
  
    ngOnInit(): void {
  this.authorlistService.getAuthors();
  this.authorsSubscription=this.authorlistService
  .getAuthorsStream()
  .subscribe((authors:authorinterface[])=>{
  this.authors=authors;
  })
    }
    ngOnDestroy(){
      this.authorsSubscription.unsubscribe();
    }
  
  
    delete(i:any){
      this.authorlistService.deleteAuthor(i._id.toString())
      .subscribe((authors)=>{
        console.log(authors)
        this.authors=this.authors.filter(p =>p !== i)
      })
        }
        edit(i:any){
          localStorage.setItem("editAuthorId",i._id.toString());
          this.router.navigate(['editauthor'])
          
            }
            viewAuthor(i:any){
              localStorage.setItem("editAuthorId",i._id.toString());
              this.router.navigate(['author'])
              
                }
  

}
