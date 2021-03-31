import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/noticias.interface';
import { IonSegment, LoadingController, IonInfiniteScroll, IonCard, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit {

  categorias: string[] = ['business','entertainment','general','health','science','sports','technology'];
  // categoriaSeleccionada: string = 'general';
  noticias: Article[] = [];
  loading: HTMLIonLoadingElement;
  @ViewChild(IonSegment) segment: IonSegment;
  @ViewChild(IonInfiniteScroll) scroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;

  constructor(
    private ns: NoticiasService,
    private lCtrl: LoadingController
  ) {}

  ngAfterViewInit(): void {
    this.segment.value = this.categorias[0]
  }

  ngOnInit(): void {
    this.getNoticias( this.categorias[0] );
  }

  async getNoticias( nameCategoria: any, event?: any ){
    let categoria = '';
    if( typeof(nameCategoria) === 'string' ){ categoria = nameCategoria }
    else { categoria = (<CustomEvent>nameCategoria).detail.value }

    if( !event ){
      await this.createLoading();
      this.noticias = [];
    }
    this.ns.getNoticiasPorCategoria(categoria)
      .subscribe(
        async (response) => {
          this.noticias.push(...response.articles);
          if( !event ){
            this.content.scrollToTop(500);
            await this.loading.dismiss();
            this.scroll.disabled = false;
          }
          else{
            event.target.complete();
            if(response.articles.length === 0){ this.scroll.disabled = true; }
          }
        }
      );
  }

  async createLoading(){
    this.loading = await this.lCtrl.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  async loadData( event ){
    await this.getNoticias( this.segment.value, event );
  }
}
