import {Component, OnInit} from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {GeneratedStyles} from "../../../utils/animate";
import {ArticuloService} from "../../../services/articulo.service";
import {ArticuloModel} from "../../../entities/Articulo.model";
import {LoginService} from "../../../services/login.service";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
  animations: [
    trigger('ngForAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({opacity: 0}), //ESTADO INICIAL TRANSPARENTE
          stagger('50ms', //EJECUCiÓN DE LA ANIMACIÓN
            animate('500ms ease', GeneratedStyles.Animations.backInRight)
          )
        ], {optional: true}),
      ])
    ])
  ]
})

export class ArticulosComponent implements OnInit {
  editar = faEdit;
  faTrash = faTrashAlt

  articulos: ArticuloModel[] = []

  constructor(private articuloService: ArticuloService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.articuloService.getArticulos()
      .subscribe(data => {
        console.log(data);
        this.articulos = data
      })
  }

  isAdmin() {
    return this.loginService.isAdmin();
  }

  remove(id: number) {
    console.log("Has clicado el boton eliminar para el id: " + id);
    this.articuloService.delete(id)
  }
}
