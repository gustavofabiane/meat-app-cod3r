import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from './restaurant.model';
import { transition, animate, state, style, trigger } from '@angular/animations';

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    trigger('restaurant-appeared', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({ opacity: 0, transform: 'translate(-30px, -10px)' }),
        animate('500ms 0s ease-in-out')
    ])
  ])]
})
export class RestaurantComponent implements OnInit {

  restaurantState: string = 'ready';

  @Input() restaurant: Restaurant

  constructor() { }

  ngOnInit() {
  }

}
