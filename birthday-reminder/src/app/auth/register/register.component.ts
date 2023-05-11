import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: UntypedFormGroup;
  private unsubscribe$ = new Subject();
  email: string;
  firstName: string;
  lastName: string;
  password1: string;
  password2: string;

  constructor(
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      password1: [null, [Validators.required]],
      password2: [null, [Validators.required]],
    });

    this.registerForm.valueChanges
      .pipe(
        filter(() => !this.registerForm.pristine),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.email = this.getEmail?.value;
        this.firstName = this.getFirstName?.value;
        this.lastName = this.getLastName?.value;
        this.password1 = this.getPassword1?.value;
        this.password2 = this.getPassword2?.value;
      });
  }

  register() {
    this.authService
      .register(
        this.email,
        this.firstName,
        this.lastName,
        this.password1,
        this.password2
      )
      .subscribe((success) => {
        if (success) {
          console.log('Register is successfully');
        }
      });
  }

  get getEmail() {
    return this.registerForm.get('email');
  }

  get getFirstName() {
    return this.registerForm.get('firstName');
  }

  get getLastName() {
    return this.registerForm.get('lastName');
  }

  get getPassword1() {
    return this.registerForm.get('password1');
  }

  get getPassword2() {
    return this.registerForm.get('password2');
  }
}