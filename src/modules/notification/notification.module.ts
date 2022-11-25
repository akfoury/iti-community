import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationStore } from './notification.store';
import { NotificationService } from './services/notification.service';
import { NotificationQueries } from './services/notification.queries';
import { LocalNotificationQueries } from './services/platform/local/notification.queries.local';
import { HttpNotificationQueries } from './services/platform/http/notification.queries.http';
import { NotificationCommands } from './services/notification.commands';
import { HttpNotificationCommands } from './services/platform/http/notification.commands.http';
import { NotificationSocketService } from './services/notification.socket.service';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { NotificationWidgetComponent } from './components/notification-widget/notification-widget.component';

@NgModule({
  providers: [NotificationStore, NotificationService,
    {
      provide: NotificationQueries,
      useClass: HttpNotificationQueries
    }, {
      provide: NotificationCommands,
      useClass: HttpNotificationCommands
    }, NotificationSocketService],
  imports: [
    CommonModule,
    NzMessageModule
  ],
  declarations: [
    NotificationBarComponent,
    NotificationWidgetComponent
  ],
  exports: [
    NotificationBarComponent,
    NotificationWidgetComponent
  ]
})
export class NotificationModule { }
