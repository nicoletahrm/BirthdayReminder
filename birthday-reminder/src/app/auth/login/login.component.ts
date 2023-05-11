import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  constructor(private authService: AuthService, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  login(email: string, password: string, rememberMe: boolean) {
    this.authService.login(email, password, rememberMe).subscribe(success =>{
      if (success) {
        console.log('Logged in successfully');
      }
    })
  }
}
