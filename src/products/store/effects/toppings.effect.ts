import { Injectable } from '@angular/core';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Actions, Effect } from '@ngrx/effects';

import * as toppingsActions from '../actions/toppings.action';
import { ToppingsService } from '../../services';

@Injectable()
export class ToppingsEffects {
  constructor(private actions$: Actions, private toppingsService: ToppingsService) {}

  @Effect()
  loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() =>
      this.toppingsService.getToppings().pipe(
        map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
        catchError(error => of(new toppingsActions.LoadToppingsFail(error))),
      ),
    ),
  );
}
