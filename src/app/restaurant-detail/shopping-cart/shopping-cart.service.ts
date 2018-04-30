import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";
import { Injectable } from "@angular/core";
import { NotificationsService } from "../../shared/messages/notifications.service";

@Injectable()
export class ShoppingCartService {

    items: CartItem[] = [];

    constructor(private notificationService: NotificationsService) { }

    clear() {
        this.items = [];
    }

    addItem(item: MenuItem) {

        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id);

        if(foundItem) {
            this.increaseQty(foundItem);
        } else {
            this.items.push(new CartItem(item));
        }
        this.notificationService.notify(item.name + " foi adicionado ao carrinho!");
    }

    increaseQty(item: CartItem): void {
        item.quantity++;
    }

    decreaseQty(item: CartItem): void {
        item.quantity--;
        if(item.quantity == 0) {
            this.removeItem(item);
        }
    }

    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1);
        this.notificationService.notify(item.menuItem.name + " foi removido do carrinho!");
    }

    total(): number {
        return this.items.map(item => item.value()).reduce((prev, value) => (prev + value), 0);
    }
}