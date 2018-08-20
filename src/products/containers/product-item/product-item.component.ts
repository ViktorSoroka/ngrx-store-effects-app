import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';


@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  templateUrl: 'product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise: Pizza;
  toppings: Topping[];

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.store.dispatch(new fromStore.loadToppings());
    this.pizza$ = this.store.select(fromStore.getSelectedPizza);
  }

  onSelect(event: number[]) {

  }

  onCreate(event: Pizza) {

  }

  onUpdate(event: Pizza) {
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');

    if (remove) {

    }
  }
}
