import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import {AuthorModel} from '../authors/authormodel'
import {AuthorlistService} from '../authorlist.service'

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  title:String="Author"
  author= new AuthorModel('','','','');

  constructor(public router:Router,private authorListService:AuthorlistService) { }

  ngOnInit(): void {
    let authorId = localStorage.getItem("editAuthorId")
console.log(authorId)
this.authorListService.getauthor(authorId).subscribe((data)=>{
  console.log(data);
  this.author=JSON.parse(JSON.stringify(data))
})
  }
  redirect(){
    this.router.navigate(['authors'])
  }

}
