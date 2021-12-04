import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooklistService } from '../booklist.service';
import{BookModel} from '../books/bookmodel'
import { ListService } from '../list.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  title:String="Book"
  book= new BookModel('','','','');

  constructor(public router:Router,private listService:ListService,private bookListService :BooklistService) { }

  ngOnInit(): void {
    let bookId = localStorage.getItem("editBookId")
console.log(bookId)
this.bookListService.getbook(bookId).subscribe((data)=>{
  console.log(data);
  this.book=JSON.parse(JSON.stringify(data))
})
  }
  redirect(){
    this.router.navigate(['allbook'])
  }

}
