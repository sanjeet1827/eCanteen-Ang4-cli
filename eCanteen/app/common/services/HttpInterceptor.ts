import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class AddHttpHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedReq = req.clone({ headers: req.headers.set('Content-Type', 'application/json; charset=utf-8') });
        return next.handle(clonedReq);
    }
}