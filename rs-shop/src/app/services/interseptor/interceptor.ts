  
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
} from '@angular/common/http';
import { baseUrl } from 'src/app/utils/data';
import { LoginFormService } from 'src/app/components/login-form/login-form.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loginFormService: LoginFormService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.loginFormService.isAuthenticated()) {
      req = req.clone({
        url: baseUrl + req.url,
        setHeaders: {
          Authorization: `Bearer ${this.loginFormService.getToken()}`,
        },
      });
    } else {
      req = req.clone({
        url: baseUrl + req.url,
      });
    }
    return next.handle(req);
  }

}