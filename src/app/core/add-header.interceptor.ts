import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../shared/storage.service';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(this.storageService.getUser());

    let jsonReq: HttpRequest<any> = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.storageService.getUser().accessToken}`,
      },
    });

    return next.handle(jsonReq);
  }
}
