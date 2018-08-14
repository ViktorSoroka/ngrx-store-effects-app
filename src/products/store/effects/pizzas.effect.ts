import { Injectable } from '@angular/core';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Actions, Effect } from '@ngrx/effects';

import * as pizzasActions from '../actions/pizzas.action';
import { PizzasService } from '../../services';

@Injectable()
export class PizzasEffects {
  constructor(private actions$: Actions, private pizzasService: PizzasService) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzasActions.LOAD_PIZZAS).pipe(
    switchMap(() => this.pizzasService.getPizzas().pipe(
      map(pizzas => new pizzasActions.loadPizzasSuccess(pizzas)),
      catchError(error => of(new pizzasActions.loadPizzasFail(error)))
    ))
  )
}
