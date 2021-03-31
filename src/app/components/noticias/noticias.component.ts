import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/noticias.interface';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent {

  @Input('data') noticias: Article[] = []
  @Input() enFavoritos: boolean = false;

  constructor() { }

  ngOnInit() {}

}
