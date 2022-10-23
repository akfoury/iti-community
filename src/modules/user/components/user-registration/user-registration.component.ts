import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less'],
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild('f')
  form: NgForm;

  model = new UserRegistrationFormModel();

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  async submit() {
    this.userService.register(this.form.controls.username.value, this.form.controls.password.value).then(() => {
      this.goToLogin();
    });
  }

  goToLogin() {
    this.router.navigate(['/splash/login']);
  }
}
