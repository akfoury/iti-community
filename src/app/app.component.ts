import { Component } from '@angular/core';
import { NotificationWebService } from 'src/modules/notification/services/notification.web.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(
    private notificationWebService: NotificationWebService
  ) {
  }

  ngOnInit() {
    console.log('in web notifications');
    this.notificationWebService.initializeWebNotifications();
  }
  title = 'iti-community';
}
