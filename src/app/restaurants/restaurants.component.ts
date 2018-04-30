import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { transition, animate, state, style, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/from';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({ opacity: 0, "max-height": 0 })),
      state('visible', style({ opacity: 1, "max-height": "70px", "margin-top": "20px" })),
      transition('* => *', animate('250ms 0s ease-in-out'))
  ])]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden';

  restaurants: Restaurant[];

  searchForm: FormGroup;

  searchControl: FormControl;

  constructor(private restaurantsService: RestaurantsService, private fb: FormBuilder) {

  }

  ngOnInit() {
    
    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });
    
    this.searchControl.valueChanges
        .debounceTime(500) // espera para refazer a busca
        .distinctUntilChanged() // faz a busca apenas se o valor mudar
        .do(searchTerm => console.log('Busca: ' + searchTerm)) 
        .switchMap(searchTerm => this.restaurantsService.restaurants(searchTerm)
                                     .catch(error => Observable.from([]))) // mapeia o subscribe para o serviço de restaurantes
        .subscribe(restaurants => this.restaurants = restaurants);

    this.restaurantsService.restaurants()
        .subscribe(restaurants => this.restaurants = restaurants);
  }

  toggleSearch(): void {
    this.searchBarState = this.searchBarState == 'hidden' ? 'visible' : 'hidden';
  }
}
