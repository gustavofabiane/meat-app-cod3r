import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OrderComponent } from './order.component';

@Injectable()
export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {
  canDeactivate(component: OrderComponent, 
                currentRoute: ActivatedRouteSnapshot, 
                currentState: RouterStateSnapshot, 
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    
    if(!component.isOrderCompleted()) {
      return window.confirm('Deseja cancelar a compra?');
    } else {
      return true;
    }
  }
}
