import { EventEmitter } from "@angular/core";

export class NotificationsService {

    notifier = new EventEmitter<string>();

    notify(message: string): void {
        this.notifier.emit(message);
    }
}