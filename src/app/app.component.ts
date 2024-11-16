import { Component } from '@angular/core';
import { LogUpdateService } from './services/log-update.service';
import { PushNotificationService } from './services/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portafolio web';

  constructor(
    private logUpdate: LogUpdateService,
    private pushNotification: PushNotificationService
  ){}

  ngOnInit() {
    this.logUpdate.subscribe();
    this.pushNotification.subscribeToNotifications();
    this.pushNotification.listenForNotifications();
  }

}
