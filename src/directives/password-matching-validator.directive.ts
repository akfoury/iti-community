import { Directive  } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidationErrors, FormGroup } from '@angular/forms';

@Directive({
  selector: '[passwordMatching]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PasswordMatchingValidatorDirective, multi: true }
  ]
})
export class PasswordMatchingValidatorDirective implements Validator {

  constructor(
    ) { }

  validate(formGroup: FormGroup): ValidationErrors | null {
    const control = formGroup.controls['password'];
    const checkControl = formGroup.controls['confirm-password'];

    if (checkControl?.errors && !checkControl.errors['matching']) {
      return null;
    }

    if (control?.value !== checkControl?.value) {
      checkControl?.setErrors({ matching: true });
      return { matching: true };
    } else {
      checkControl?.setErrors(null);
      return null;
    }
  }
}
