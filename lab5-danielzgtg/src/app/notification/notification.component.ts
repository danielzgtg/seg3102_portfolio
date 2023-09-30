import {Component, OnDestroy} from '@angular/core';
import {NotificationService} from "./notification.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnDestroy {
  protected error: boolean = false;
  protected message: string = "";
  private sub: Subscription;

  constructor(service: NotificationService) {
    this.sub = service.$.subscribe(x => {
      this.error = x.error;
      this.message = x.message;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
