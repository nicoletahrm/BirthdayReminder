import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { Friend } from 'src/app/inferfaces/friend.interface';
import { FriendService } from '../services/friend.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomValidators } from 'src/app/helpers/custom-validators';

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

  isEdit: boolean = false;

  @Input() friend: Friend = {
    id: 0,
    first_name: '',
    last_name: '',
    city: '',
    phone_number: '',
    birthday_date: '',
  };

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
      birthday_date: [null, [Validators.required, CustomValidators.dateValidator]],
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

    this.friend = history.state;
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
          this.message.success(
            `${response.friend.first_name} added successfully`
          );
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
      },
    });
  }

  editFriend() {
    console.log(this.isEdit);
    this.isEdit = true;

    console.log(this.isEdit);

    this.newFriend = {
      id: this.friend.id,
      first_name: this.friend.first_name,
      last_name: this.friend.last_name,
      city: this.friend.city,
      phone_number: this.friend.phone_number,
      birthday_date: this.friend.birthday_date,
    };

    this.friendService.putFriend(this.newFriend).subscribe();
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
