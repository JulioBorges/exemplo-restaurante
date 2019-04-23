import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurante } from '../models/restaurante';
import { RestaurantesService } from '../services/restaurantes.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurante',
  providers: [RestaurantesService],
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent implements OnInit {
  inserir: boolean;
  restaurante: Restaurante;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private restaurantesService: RestaurantesService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.restaurante = {
      id: undefined,
      nome: ''
    };
  }

  ngOnInit() {
    const id = this._Activatedroute.snapshot.params['id'];
    if (id === undefined) {
      this.inserir = true;
    }

    this.getRestaurante(id);
  }

  getRestaurante(id: number) {
    if (id) {
      this.restaurantesService.getRestaurante(id).subscribe(data => {
        this.restaurante = data;
      });
    }
  }

  insertOrUpdate() {
    if (this.restaurante) {
      if (this.inserir) {
        this.restaurantesService.addRestaurante(this.restaurante).subscribe(data => {
          this.restaurante = data;
          this.snackBar.open('Registro inserido com sucesso !', null, {
            duration: 1000
          });
          this.router.navigate(['/restaurantes']);
        });
      } else {
        this.restaurantesService.updateRestaurante(this.restaurante).subscribe(data => {
          this.snackBar.open('Registro atualizado com sucesso !', null, {
            duration: 1000
          });
          this.router.navigate(['/restaurantes']);
        });
      }
    }
  }
}
