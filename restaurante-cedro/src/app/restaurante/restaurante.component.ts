import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Restaurante } from '../models/restaurante';
import { RestaurantesService } from '../services/restaurantes.service';
import { MatSnackBar } from '@angular/material';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-restaurante',
  providers: [RestaurantesService],
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent implements OnInit {

  inserir: boolean
  restaurante: Restaurante
  constructor(private _Activatedroute: ActivatedRoute, private restaurantesService: RestaurantesService,
    public snackBar: MatSnackBar) {
    this.restaurante = {
      id: undefined,
      nome: ''
    };
  }

  ngOnInit() {
    var id = this._Activatedroute.snapshot.params['id'];
    if (id == undefined)
      this.inserir = true;

    this.getRestaurante(id);
  }

  getRestaurante(id: number) {
    if (id) {
      this.restaurantesService.getRestaurante(id)
        .subscribe(data => {
          this.restaurante = data;
        });
    }

  }

  insertOrUpdate() {
    if (this.restaurante) {
      if (this.inserir) {
        this.restaurantesService.addRestaurante(this.restaurante)
          .subscribe(data => {
            this.restaurante = data;
            this.snackBar.open('Registro inserido com sucesso !', 'OK', {
              duration: 2000,
            });
          });
      }
      else {
        this.restaurantesService.updateRestaurante(this.restaurante)
          .subscribe(data => {
            this.snackBar.open('Registro atualizado com sucesso !', 'OK', {
              duration: 2000,
            });
          });
      }
    }
  }
}
