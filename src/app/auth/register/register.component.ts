import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { register } from '../store/auth.actions';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { AuthStateInterface } from '../types/authState.interface';
import { selectIsSubmitting, selectValidationErrors } from '../store/auth.reducer';
import { combineLatest, Observable } from 'rxjs';
import { BackendErrorMessages } from '../../shared/components/backendErrorMessages/backendErrorMessages.component';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form: FormGroup;
  isSubmitting$ : Observable<boolean>;
  data$: Observable<{
        isSubmitting: boolean;
        backendErrors: BackendErrorsInterface | null;
        }> ;
  constructor(
    private fb: FormBuilder,
    private store: Store<{auth: AuthStateInterface}>
  ) {
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.isSubmitting$ = this.store.select(selectIsSubmitting)
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    })
  }

  onNgInit() {}
  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(register({ request }));
  }
}
