import { Injectable ,Injector} from '@angular/core';
import{AuthService} from './auth.service';
import {HttpInterceptor} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor{
  
  intercept(req:any,nxt:any){
    let authService = this.injector.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization:`Bearer ${authService.getToken()} ${authService.getToken2()}`
      }
    })
    return nxt.handle(tokenizedReq);
      }
  constructor(private injector:Injector) { }
}
