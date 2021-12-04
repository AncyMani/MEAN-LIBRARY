import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

 

@Injectable({

  providedIn: 'root'

})

export class ListService {

 

  constructor(private http:HttpClient) { }

 

  server_address:string='api';

  getbooks(){

    return this.http.get(`${this.server_address}/books`)

 

   }

   getauthors(){

     return this.http.get(`${this.server_address}/authors`)

 

    }

   getbook(id:any){

 

     return this.http.get(`${this.server_address}/books`+id)

   }

   getauthor(id:any){

 

     return this.http.get(`${this.server_address}/authors`+id)

   }

   deleteBook(id:any){

     return this.http.delete(`${this.server_address}/remove/book`+id)

       

       }

 deleteAuthor(id:any){

     return this.http.delete(`${this.server_address}/remove/author`+id)

           

       }        

 

}