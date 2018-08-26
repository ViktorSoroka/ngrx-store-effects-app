import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, filter, first, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromStore from '../store';

@Injectable()
export class ToppingsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkToppings().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }

  checkToppings(): Observable<boolean> {
    return this.store.select(fromStore.getToppingsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadToppings());
        }
      }),
      filter(loaded => loaded),
      first()
    );
  }
}
