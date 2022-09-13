import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  /* The method patternValidator is used to validate the isbn pattern in our form.
     We will use a regular expression to validate the isbn to ensure that we have
     10 0r 13 digits in the input. */
  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[A-Z]{0,10}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidIsbn: true };
    };
  }

  constructor() { }
}
