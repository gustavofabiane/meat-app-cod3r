import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { Order } from "./order.model";
import { Observable } from "rxjs/Observable";
import { MEAT_API } from "../app.api";

@Injectable()
export class OrderService {

    constructor(private cartService: ShoppingCartService, 
                private http: HttpClient) { }

    itemsValue(): number {
        return this.cartService.total();
    }

    cartItems(): CartItem[] {
        return this.cartService.items;
    }

    increaseQty(item: CartItem): void {
        this.cartService.increaseQty(item);
    }

    decreaseQty(item: CartItem): void {
        this.cartService.decreaseQty(item);
    }

    remove(item: CartItem): void {
        this.cartService.removeItem(item);
    }

    clear(): void {
        this.cartService.clear();
    }

    checkOrder(order: Order): Observable<number> {
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
                        .map(order => order.id);
    }
}