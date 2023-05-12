import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
})
export class AddFriendComponent implements OnInit {
  addFriendForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.addFriendForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      phone_number: [null, [Validators.required]],
      city: [null, [Validators.required]],
      birthday_date: [null, [Validators.required]],
    });
  }

  add() {}

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.addFriendForm.reset();
    for (const key in this.addFriendForm.controls) {
      if (this.addFriendForm.controls.hasOwnProperty(key)) {
        this.addFriendForm.controls[key].markAsPristine();
        this.addFriendForm.controls[key].updateValueAndValidity();
      }
    }
  }
}
