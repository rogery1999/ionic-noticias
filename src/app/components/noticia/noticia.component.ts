import { Component, Input } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ActionSheetController, ToastController } from '@ionic/angular';
const { Browser } = Plugins;
const { Share } = Plugins;

import { Article } from '../../interfaces/noticias.interface';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent {

  @Input() noticia: Article;
  @Input() posicion: number = 0;
  @Input() enFavoritos: boolean = false;

  constructor(
    private actionSheetController: ActionSheetController,
    private dataLocalService: DataLocalService,
    private toastController: ToastController
  ) { }


  async abrirNoticia(){
    await Browser.open({ url: this.noticia.url });
  }

  async lanzarMenu(){
    const guardarBorrarBtn = this.enFavoritos
                              ?
                              {
                                text: 'Quitar de favorito',
                                icon: 'trash',
                                cssClass: 'action-dark',
                                handler: () => {
                                    this.dataLocalService.eliminarFavorito(this.noticia)
                                      .then(
                                        (_) => this.presentToast('Noticia eliminada!')
                                      );
                                }
                              }
                              :
                              {
                                text: 'Favorito',
                                icon: 'star',
                                cssClass: 'action-dark',
                                handler: () => {
                                  this.dataLocalService.guardarNoticia(this.noticia);
                                  this.presentToast('Noticia agregada!');
                                }
                              };



    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: async () => {
            console.log('Share clicked');
            const shareRet = await Share.share({
              title: this.noticia.title,
              text: this.noticia.description,
              url: this.noticia.url,
              dialogTitle: 'Hola mundo'
            });
          }
        },
        guardarBorrarBtn
        ,
        {
          text: 'Cancelar',
          icon: 'close',
          cssClass: 'action-dark',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
      }]
    });
    await actionSheet.present();
  }

  async presentToast(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }


}
