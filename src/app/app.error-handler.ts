import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { HttpErrorResponse, HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { NotificationsService } from "./shared/messages/notifications.service";
import { LoginService } from "./security/login/login.service";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private notifier: NotificationsService, 
                private zone: NgZone,
                private injector: Injector) {
        super();
    }

    // intercept(
    //     req: HttpRequest<any>,
    //     next: HttpHandler
    //   ): Observable<HttpEvent<any>> {
    //     return next.handle(req).catch(e => this.handleError(e));
    // }

    handleError(errorResponse: HttpErrorResponse | any) {
        if(errorResponse instanceof HttpErrorResponse) {
            const message = errorResponse.error.message;
            this.zone.run(() => {
                switch(errorResponse.status) {
                    case 400:
                        this.injector.get(LoginService).handleLogin();
                        this.notifier.notify('Por favor, efetue o login para continuar')
                        break;
                    case 401:
                        this.notifier.notify(message || 'Não autorizado');
                        break;
                    case 403:
                        this.notifier.notify(message || 'Não autorizado');
                        break;
                    case 404:
                        this.notifier.notify(message || 'Recurso não encontrado');
                        break;
                }
            });
        }
        super.handleError(errorResponse);
        // let errorMessage: string;

        // if(error instanceof HttpErrorResponse) {
        //     const body = error.error;
        //     errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}: ${body}`;
        // } else {
        //     errorMessage = error.toString();
        // }

        // console.log(errorMessage);

        // return Observable.throw(errorMessage);
    }
}