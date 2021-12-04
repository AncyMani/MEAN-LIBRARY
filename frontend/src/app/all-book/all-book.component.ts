import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { BooklistService } from '../booklist.service';
import { ListService } from '../list.service';
import {bookinterface} from '../models/newbookmodel'

@Component({
  selector: 'app-all-book',
  templateUrl: './all-book.component.html',
  styleUrls: ['./all-book.component.css']
})
export class AllBookComponent implements OnInit ,OnDestroy {
  title:string="Books"
books:bookinterface[]=[];
private booksSubscription : Subscription;

  constructor(public auth:AuthService, public listService:ListService , public router:Router ,private bookListService:BooklistService) { }

  ngOnInit(): void {
this.bookListService.getBooks();
this.booksSubscription=this.bookListService
.getBooksStream()
.subscribe((books:bookinterface[])=>{
this.books=books;
})
  }
  ngOnDestroy(){
    this.booksSubscription.unsubscribe();
  }


  delete(i:any){
    this.bookListService.deleteBook(i._id.toString())
    .subscribe((books)=>{
      // console.log(books)
      this.books=this.books.filter(p =>p !== i)
    })
      }
      edit(i:any){
        localStorage.setItem("editBookId",i._id.toString());
        this.router.navigate(['editbook'])
        
          }
          viewBook(i:any){
            localStorage.setItem("editBookId",i._id.toString());
            this.router.navigate(['book'])
            
              }

}
