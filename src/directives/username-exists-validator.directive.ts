import { Directive  } from '@angular/core';
import { ValidationErrors, AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { UserService } from 'src/modules/user/services/user.service';

@Directive({
  selector: '[userNameExists]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: UserNameExistsValidatorDirective, multi: true }
  ]
})
export class UserNameExistsValidatorDirective implements AsyncValidator {

  constructor(
    private userService: UserService
    ) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      this.userService.exists(control.value).then(isExists => {
        return isExists ? resolve({ exists: true }) : resolve(null);
      });
    });
  }
}
