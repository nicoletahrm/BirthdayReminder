import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  private unsubscribe$ = new Subject();
  email: string;
  password: string;
  remember: boolean;

  constructor(
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });

    this.loginForm.valueChanges
      .pipe(
        filter(() => !this.loginForm.pristine),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.email = this.getEmail?.value;
        this.password = this.getPassword?.value;
        this.remember = this.getRemember?.value;
      });
  }

  login() {
    this.authService
      .login(this.email, this.password, this.remember)
      .subscribe((success) => {
        if (success) {
          console.log('Logged in successfully');
        }
      });
  }

  get getEmail() {
    return this.loginForm.get('email');
  }
  get getPassword() {
    return this.loginForm.get('password');
  }
  get getRemember() {
    return this.loginForm.get('remember');
  }
}
