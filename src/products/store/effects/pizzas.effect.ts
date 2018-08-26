import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../app/store';
import * as pizzasActions from '../actions/pizzas.action';
import { PizzasService } from '../../services';

const toPayload = <T>(action: { payload: T }) => action.payload;

@Injectable()
export class PizzasEffects {
  constructor(private actions$: Actions, private pizzasService: PizzasService) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType<pizzasActions.loadPizzas>(pizzasActions.LOAD_PIZZAS).pipe(
    switchMap(() =>
      this.pizzasService.getPizzas().pipe(
        map(pizzas => new pizzasActions.loadPizzasSuccess(pizzas)),
        catchError(error => of(new pizzasActions.loadPizzasFail(error))),
      ),
    ),
  );

  @Effect()
  createPizza$ = this.actions$.ofType<pizzasActions.createPizza>(pizzasActions.CREATE_PIZZA).pipe(
    map(toPayload),
    switchMap(pizza =>
      this.pizzasService.createPizza(pizza).pipe(
        map(pizza => new pizzasActions.createPizzaSuccess(pizza)),
        catchError(error => of(new pizzasActions.createPizzaFail(error))),
      ),
    ),
  );

  @Effect()
  createPizzaSuccess$ = this.actions$
    .ofType<pizzasActions.createPizzaSuccess>(pizzasActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map(toPayload),
      map(
        pizza =>
          new fromRoot.Go({
            path: ['/products', pizza.id],
          }),
      ),
    );

  @Effect()
  updatePizza$ = this.actions$.ofType<pizzasActions.updatePizza>(pizzasActions.UPDATE_PIZZA).pipe(
    map(toPayload),
    switchMap(pizza =>
      this.pizzasService.updatePizza(pizza).pipe(
        map(pizza => new pizzasActions.updatePizzaSuccess(pizza)),
        catchError(error => of(new pizzasActions.updatePizzaFail(error))),
      ),
    ),
  );

  @Effect()
  deletePizza$ = this.actions$.ofType<pizzasActions.removePizza>(pizzasActions.REMOVE_PIZZA).pipe(
    map(toPayload),
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
          new fromRoot.Go({
            path: ['/products'],
          }),
      ),
    );
}
