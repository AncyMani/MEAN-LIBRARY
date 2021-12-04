import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ListService } from '../list.service';
import{ BookModel} from './bookmodel'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  title:String = "Books"
  books:BookModel[]=[];
  constructor(public auth:AuthService ,private listService:ListService, public router:Router) { }

  ngOnInit(): void {
    this.listService.getbooks().subscribe((data)=>{
      this.books=JSON.parse(JSON.stringify(data))
  })
}
viewBook(i:any){
  localStorage.setItem("editBookId",i._id.toString());
  this.router.navigate(['book'])
  
    }
    delete(i:any){
      this.listService.deleteBook(i._id.toString())
      .subscribe((data)=>{
        this.books=this.books.filter(p =>p !== i)
      })
        }
        edit(i:any){
          localStorage.setItem("editBookId",i._id.toString());
          this.router.navigate(['editbook'])
          
            }
}



