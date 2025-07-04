import { Injectable } from '@angular/core';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';

const defaultConfig: ToastConfig = {
  message: 'Your toast message',
  messageType: 'success',
  durationInMs: 5000,
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController) { }

  publishNotification(message: string) {
    const config = {...defaultConfig, message}
    this.toastController.showToast(config);
  }

  publishObjectNotification(message: string, object: any) {
    this.publishNotification(message + ', ' + JSON.stringify(object));
  }
}
