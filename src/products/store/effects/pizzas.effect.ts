import { Injectable } from '@angular/core';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Actions, Effect } from '@ngrx/effects';

import * as fromStore from '../../../app/store';
import * as pizzasActions from '../actions/pizzas.action';
import { PizzasService } from '../../services';

@Injectable()
export class PizzasEffects {
  constructor(private actions$: Actions, private pizzasService: PizzasService) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzasActions.LOAD_PIZZAS).pipe(
    switchMap(() =>
      this.pizzasService.getPizzas().pipe(
        map(pizzas => new pizzasActions.loadPizzasSuccess(pizzas)),
        catchError(error => of(new pizzasActions.loadPizzasFail(error))),
      ),
    ),
  );

  @Effect()
  createPizza$ = this.actions$.ofType(pizzasActions.CREATE_PIZZA).pipe(
    map((action: pizzasActions.createPizza) => action.payload),
    switchMap(pizza =>
      this.pizzasService.createPizza(pizza).pipe(
        map(pizza => new pizzasActions.createPizzaSuccess(pizza)),
        catchError(error => of(new pizzasActions.createPizzaFail(error))),
      ),
    ),
  );

  @Effect()
  createPizzaSuccess$ = this.actions$.ofType(pizzasActions.CREATE_PIZZA_SUCCESS).pipe(
    map((action: pizzasActions.createPizzaSuccess) => action.payload),
    map(
      pizza =>
        new fromStore.Go({
          path: ['/products', pizza.id],
        }),
    ),
  );

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzasActions.UPDATE_PIZZA).pipe(
    map((action: pizzasActions.updatePizza) => action.payload),
    switchMap(pizza =>
      this.pizzasService.updatePizza(pizza).pipe(
        map(pizza => new pizzasActions.updatePizzaSuccess(pizza)),
        catchError(error => of(new pizzasActions.updatePizzaFail(error))),
      ),
    ),
  );

  @Effect()
  deletePizza$ = this.actions$.ofType(pizzasActions.REMOVE_PIZZA).pipe(
    map((action: pizzasActions.removePizza) => action.payload),
    switchMap(pizza =>
      this.pizzasService.removePizza(pizza).pipe(
        map(() => new pizzasActions.removePizzaSuccess(pizza)),
        catchError(error => of(new pizzasActions.removePizzaFail(error))),
      ),
    ),
  );

  @Effect()
  updateOrDeletePizzaSuccess$ = this.actions$
    .ofType(pizzasActions.REMOVE_PIZZA_SUCCESS, pizzasActions.UPDATE_PIZZA_SUCCESS)
    .pipe(
      map(
        () =>
          new fromStore.Go({
            path: ['/products'],
          }),
      ),
    );
}
