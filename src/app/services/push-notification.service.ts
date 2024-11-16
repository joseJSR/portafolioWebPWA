import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

const _BASE_URL = 'https://api-web-push.onrender.com';
// const _BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  readonly VAPID_PUBLIC_KEY = 'BOAR5NLZC27_Garyqc8na9ihyV4-6w4dS5UQookeIlrvrInkkVmxWRiwYd7YDP8pzC4JQG325GbwBjYpU5rlgFA';

  constructor(
    private swPush: SwPush, private http: HttpClient
  ) { }

   // Solicita permiso para notificaciones y registra la suscripción en el servidor
   subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(subscription => {
      console.log('Suscripción al push exitosa:', subscription);
      this.http.post(`${_BASE_URL}/subscribe`, subscription)
        .subscribe(() => console.log('Suscripción almacenada en el servidor'));
    }).catch(err => console.error('No se pudo suscribir al push', err));
  }

  // Escucha las notificaciones push entrantes
  listenForNotifications() {
    this.swPush.messages.subscribe((message: any) => {
      console.log('Mensaje push recibido:', message);
    });
  }
}