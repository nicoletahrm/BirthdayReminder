import { AbstractControl, ValidationErrors, FormControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static passwordStrength(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
          const value: string = control.value;
          const hasLowerCase = /[a-z]/.test(value);
          const hasUpperCase = /[A-Z]/.test(value);
          const hasNumber = /\d/.test(value);
    
          if (!hasLowerCase || !hasUpperCase || !hasNumber) {
            return { passwordStrength: true };
          }
    
          return null;
        };
    }

    static dateValidator: ValidatorFn = (
      control: AbstractControl
    ): { [key: string]: any } | null => {
      let date = control.value;
  
      if (date === '' || date == null) {
        return null;
      }
  
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
  
      if (selectedDate > currentDate) {
        return { dateInFuture: true };
      }
  
      return null;
    };
  }