import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddauthorComponent } from './addauthor/addauthor.component';
import { AddbookComponent } from './addbook/addbook.component';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { EditauthorComponent } from './editauthor/editauthor.component';
import { EditbookComponent } from './editbook/editbook.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AuthGuard} from './auth.guard'
import { BookComponent } from './book/book.component';
import { AuthorComponent } from './author/author.component';
import { AllBookComponent } from './all-book/all-book.component';

 
const routes: Routes = [{path:'',component:HomeComponent},
{path:'home',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'signup',component:SignupComponent},
// {path:'books',component:BooksComponent},
{path:'authors',component:AuthorsComponent},
{path:'editbook',component:EditbookComponent},
{path:'editauthor',component:EditauthorComponent},
{path:'book',component:BookComponent},
{path:'author',component:AuthorComponent},
{path:'allbook',

component:AllBookComponent},
{path:'addbook',
canActivate:[AuthGuard]
,component:AddbookComponent},
{path:'addauthor',
canActivate:[AuthGuard],
component:AddauthorComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
