import { Component, OnInit } from '@angular/core';
import { Prato } from '../models/prato';
import { ActivatedRoute, Router } from '@angular/router';
import { PratosService } from '../services/pratos.service';
import { MatSnackBar } from '@angular/material';
import { RestaurantesService } from '../services/restaurantes.service';
import { Restaurante } from '../models/restaurante';

@Component({
  selector: 'app-prato',
  providers: [PratosService, RestaurantesService],
  templateUrl: './prato.component.html',
  styleUrls: ['./prato.component.css']
})
export class PratoComponent implements OnInit {
  inserir: boolean;
  prato: Prato;
  restaurantes: Restaurante[];
  restauranteSelecionado: Restaurante;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private pratosService: PratosService,
    public snackBar: MatSnackBar,
    private router: Router,
    private restaurantesService: RestaurantesService
  ) {
    this.prato = {
      id: undefined,
      nome: '',
      idRestaurante: null,
      restaurante: null,
      preco: 0.0
    };
  }

  ngOnInit() {
    const id = this._Activatedroute.snapshot.params['id'];

    if (id === undefined) {
      this.inserir = true;
    }

    this.getPrato(id);
    this.restaurantesService.getRestaurantes().subscribe(data => {
      this.restaurantes = data;
    });
  }

  getPrato(id: number) {
    if (id) {
      this.pratosService.getPrato(id).subscribe(data => {
        this.prato = data;
      });
    }
  }

  insertOrUpdate() {
    if (this.prato) {
      if (this.inserir) {
        this.pratosService.addPrato(this.prato).subscribe(data => {
          this.prato = data;
          this.snackBar.open('Registro inserido com sucesso !', null, {
            duration: 1000
          });
          this.router.navigate(['/pratos']);
        });
      } else {
        this.pratosService.updatePrato(this.prato).subscribe(data => {
          this.snackBar.open('Registro atualizado com sucesso !', null, {
            duration: 1000
          });
          this.router.navigate(['/pratos']);
        });
      }
    }
  }
}
