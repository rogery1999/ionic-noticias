import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces/noticias.interface';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private ns: NoticiasService
  ) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  loadData( event: any ){
    this.cargarNoticias(event);
  }

  cargarNoticias( event?: any ){
    this.ns.getTopHeadlines()
      .subscribe(
        (response) => {
          this.noticias.push(...response.articles);
          if ( event ) {
            event.target.complete();
            if (response.articles.length === 0) {
              event.target.disabled = true;
            }
          }
        }
      );
  }
}
