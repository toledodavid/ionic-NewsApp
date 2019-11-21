import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias:Article[] = [];

  constructor(private storage: Storage, public toastCtrl: ToastController) { 
    this.cargar_noticias_favoritos();
  }

  guardar_noticia_favoritos(noticia:Article) {

    const existe =  this.noticias.find(noti => noti.title === noticia.title);

    if(!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Agregado a favoritos');
    }
    
  }

  async cargar_noticias_favoritos() {
    const favoritos = await this.storage.get('favoritos');

    if(favoritos) {
      this.noticias = favoritos;
    }
   
  }

  borrar_noticia_favoritos(noticia: Article) {
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Borrado de favoritos');
  }

  async presentToast(message:string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }
}
