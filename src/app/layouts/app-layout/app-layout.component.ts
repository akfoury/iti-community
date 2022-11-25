import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationStore } from 'src/modules/authentication/authentication.store';
import { WebsocketConnection } from 'src/modules/common/WebsocketConnection';
import { NotificationBarComponent } from 'src/modules/notification/components/notification-bar/notification-bar.component';
import { AnyNotification } from 'src/modules/notification/notification.model';
import { NotificationService } from 'src/modules/notification/services/notification.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.less']
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  sub?: Subscription;
  showDrawer: boolean = false;
  constructor(
    private socket: WebsocketConnection,
    private authStore: AuthenticationStore,
    private notificationService: NotificationService
    ) {
    }
  ngOnInit(): void {
    this.sub = this.authStore.accessToken$.subscribe(accessToken => {
      if (accessToken) {
        this.socket.connect(accessToken);
      } else {
        this.socket.disconnect();
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  onToggleNotifications() {
    this.showDrawer = !this.showDrawer;
    if (this.showDrawer === true) {
      this.notificationService.markAsViewed();
    }
  }
}
