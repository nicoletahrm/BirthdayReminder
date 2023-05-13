import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { Friend } from 'src/app/inferfaces/friend.interface';
import { FriendService } from '../friend.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
})
export class AddFriendComponent implements OnInit {
  addFriendForm: UntypedFormGroup;
  newFriend: Friend;
  private unsubscribe$ = new Subject();
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  birthdayDate: string;

  constructor(
    private friendService: FriendService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.addFriendForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      phone_number: [null, [Validators.required]],
      city: [null, [Validators.required]],
      birthday_date: [null, [Validators.required]],
    });

    this.addFriendForm.valueChanges
      .pipe(
        filter(() => !this.addFriendForm.pristine),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.firstName = this.getFirstName?.value;
        this.lastName = this.getLastName?.value;
        this.phoneNumber = this.getPhoneNumber?.value;
        this.city = this.getCity?.value;
        this.birthdayDate = this.getBirthdayDate?.value;
      });
  }

  addFriend() {
    this.newFriend = {
      first_name: this.firstName,
      last_name: this.lastName,
      phone_number: this.phoneNumber,
      city: this.city,
      birthday_date: this.birthdayDate,
    };

    this.friendService.postFriend(this.newFriend).subscribe({
      next: (response) => {
        if (response.message) {
          this.router.navigate(['/friends']);
          this.message.success(`${response.friend.first_name} added successfully`);
        }
      },
      error: (error) => {
        console.error(error);
        if (error.error instanceof Object) {
          for (let key in error.error) {
            if (error.error[key] instanceof Array) {
              error.error[key].forEach((errorMessage: string) => {
                this.message.error(errorMessage);
              });
            } else {
              this.message.error(error.error[key]);
            }
          }
        } else {
          this.message.error(error.error || 'Add friend failed');
        }
      }
    });
  }

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

  get getFirstName() {
    return this.addFriendForm.get('first_name');
  }

  get getLastName() {
    return this.addFriendForm.get('last_name');
  }

  get getPhoneNumber() {
    return this.addFriendForm.get('phone_number');
  }

  get getCity() {
    return this.addFriendForm.get('city');
  }

  get getBirthdayDate() {
    return this.addFriendForm.get('birthday_date');
  }
}
