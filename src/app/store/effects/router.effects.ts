import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, Effect } from '@ngrx/effects';

import { map, tap } from 'rxjs/operators';

import * as routerActions from '../actions';

@Injectable()
export class RouterEffects {
  constructor(private actions: Actions, private router: Router, private location: Location) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions.ofType<routerActions.Go>(routerActions.GO).pipe(
    map(action => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    }),
  );

  @Effect({ dispatch: false })
  back$ = this.actions.ofType<routerActions.Back>(routerActions.BACK).pipe(
    tap(() => {
      this.location.back();
    }),
  );

  @Effect({ dispatch: false })
  forward$ = this.actions.ofType<routerActions.Forward>(routerActions.FORWARD).pipe(
    tap(() => {
      this.location.forward();
    }),
  );
}
