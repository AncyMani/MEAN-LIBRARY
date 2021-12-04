import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import{FormsModule,ReactiveFormsModule} from '@angular/forms'
import {AuthGuard} from './auth.guard'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { AddbookComponent } from './addbook/addbook.component';
import { AddauthorComponent } from './addauthor/addauthor.component';
import { EditbookComponent } from './editbook/editbook.component';
import { EditauthorComponent } from './editauthor/editauthor.component';
import { ListService } from './list.service';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { BookComponent } from './book/book.component';
import { AuthorComponent } from './author/author.component';
import { AllBookComponent } from './all-book/all-book.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BooklistService } from './booklist.service';
import { AuthorlistService } from './authorlist.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    BooksComponent,
    AuthorsComponent,
    AddbookComponent,
    AddauthorComponent,
    EditbookComponent,
    EditauthorComponent,
    BookComponent,
    AuthorComponent,
    AllBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [ListService,AuthService,BooklistService,AuthorlistService,
  {provide:HTTP_INTERCEPTORS,
  useClass:TokenInterceptorService,
  multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
