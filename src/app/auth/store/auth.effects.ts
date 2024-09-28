import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, switchMap } from 'rxjs/operators';

import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { authActions } from './auth.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from '../../shared/services/persistance.service';

export const registerEffect = createEffect(
  (actions$ =
    inject(Actions),
    authService = inject(AuthService),
    persitanceService=inject(PersistanceService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({request}) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persitanceService.set('accessToken', currentUser.token)
            return authActions.registerSuccess({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              })
            )
          })
        )
      })
    )
  },
  {functional: true}
)

// @Injectable()
// export class AuthEffects {


//   loadAuths$ = createEffect(() => {
//     return this.actions$.pipe(

//       ofType(AuthActions.loadAuths),
//       /** An EMPTY observable only emits completion. Replace with your own observable API request */
//       concatMap(() => EMPTY as Observable<{ type: string }>)
//     );
//   });

//   constructor(private actions$: Actions) {}
// }
