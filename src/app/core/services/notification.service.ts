import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  publishNotification(message: string) {
    this.snackBar.open(message, 'Close');
  }

  publishObjectNotification(message: string, object: any) {
    this.snackBar.open(message + ', ' + JSON.stringify(object), 'Close');
  }

  publishActionNotification(message: string, action?: string): Observable<void> {
    return this.snackBar.open(message, action).onAction();
  }

}
