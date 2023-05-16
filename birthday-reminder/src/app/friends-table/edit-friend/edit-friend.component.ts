import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from '../services/friend.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomValidators } from 'src/app/helpers/custom-validators';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-friend',
  templateUrl: './edit-friend.component.html',
  styleUrls: ['./edit-friend.component.scss']
})
export class EditFriendComponent implements OnInit {
  editFriendForm = this.fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    phone_number: ['', [Validators.required]],
    city: ['', [Validators.required]],
    birthday_date: ['', [Validators.required, CustomValidators.dateValidator]],
  });

  friendId: any;
  private unsubscribe$ = new Subject();
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  birthdayDate: string;

  constructor(
    private friendService: FriendService,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.friendId = this.route.snapshot.paramMap.get('id');
    this.friendService.getFriendById(this.friendId).subscribe(friend => {
      this.editFriendForm.setValue({
        first_name: friend?.first_name,
        last_name: friend?.last_name,
        phone_number: friend?.phone_number,
        city: friend?.city,
        birthday_date: friend?.birthday_date,
      });
  
      this.editFriendForm.valueChanges
        .pipe(
          filter(() => !this.editFriendForm.pristine),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
          this.firstName = this.getFirstName?.value;
          this.lastName = this.getLastName?.value;
          this.phoneNumber = this.getPhoneNumber?.value;
          this.city = this.getCity?.value;
          this.birthdayDate = this.getBirthdayDate?.value;
        });
    });
  }

  editFriend() {
    let friend = {
      first_name: this.firstName,
      last_name: this.lastName,
      phone_number: this.phoneNumber,
      city: this.city,
      birthday_date: this.birthdayDate,
    };

    this.friendService.updateFriend(this.friendId, friend).subscribe({
      next: (response) => {
        if (response) {
          this.router.navigate(['/friends']);
          this.message.success(
            `${response.first_name} edited successfully`
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
          this.message.error(error.error || 'Edit friend failed');
        }
      },
    });
  }

  get getFirstName() {
    return this.editFriendForm.get('first_name');
  }

  get getLastName() {
    return this.editFriendForm.get('last_name');
  }

  get getPhoneNumber() {
    return this.editFriendForm.get('phone_number');
  }

  get getCity() {
    return this.editFriendForm.get('city');
  }

  get getBirthdayDate() {
    return this.editFriendForm.get('birthday_date');
  }
}