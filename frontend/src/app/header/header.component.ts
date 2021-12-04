import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
title:String="Library App"
  constructor(public auth:AuthService , private router:Router) { }

  ngOnInit(): void {
  }
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('token1');

    this.router.navigate(['/'])

  }
}
