import { NgModule, ModuleWithProviders, ErrorHandler } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { RadioComponent } from "./radio/radio.component";
import { InputComponent } from "./input/input.component";
import { RatingComponent } from "./rating/rating.component";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { OrderService } from "../order/order.service";
import { RestaurantsService } from "../restaurants/restaurants.service";
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationsService } from "./messages/notifications.service";
import { LoginService } from "../security/login/login.service";
import { LoggedInGuard } from "../security/loggedIn.guard";
import { LeaveOrderGuard } from "../order/leave-order.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../security/auth.interceptor";
import { ApplicationErrorHandler } from "../app.error-handler";


@NgModule({
    declarations: [
        RadioComponent,
        InputComponent,
        RatingComponent,
        SnackbarComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [
        
        RadioComponent,
        InputComponent,
        RatingComponent,
        SnackbarComponent,
        
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ShoppingCartService, 
                OrderService, 
                RestaurantsService,
                NotificationsService,
                LoginService,
                LoggedInGuard,
                LeaveOrderGuard,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                },
                {provide: ErrorHandler, useClass: ApplicationErrorHandler}
            ]
        }
    }
}