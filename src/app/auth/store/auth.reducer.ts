import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions, register } from './auth.actions';
import { AuthStateInterface } from '../types/authState.interface';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
}


const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }))  ),
})

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature

//const authFeatureKey = 'auth';

// export interface State {

// }

// export const initialState: State = {

// };
// const initialState: AuthStateInterface = {
//   isSubmitting: false,
// }

// const reducer = createReducer(
//   initialState,
//   on(AuthActions.loadAuths, state => state),

// );

//  const authFeature = createFeature({
//   name: authFeatureKey,
//   reducer: createReducer(
//     initialState,
//     on(register, (state) => ({...state, isSubmitting: true}))
//   ),
// });

// export const {
//   name: authFeatureKey,
//   reducer: authReducer,
//   selectIsSubmitting,
// } = authFeature

//export const {name: authFeatureKey, reducer: authReducer} = authFeature
