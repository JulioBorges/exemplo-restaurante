import { Component, OnInit } from '@angular/core'
import { Restaurante } from '../models/restaurante'
import { RestaurantesService } from '../services/restaurantes.service'
import { MatTableDataSource } from '@angular/material'
import { AlertDialogService } from '../alert-dialog/alert-dialog.component'

@Component({
  selector: 'app-restaurantes',
  providers: [RestaurantesService, AlertDialogService],
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {
  displayedColumns: string[] = ['delete', 'edit', 'nome']
  dataSource = new MatTableDataSource()
  restaurantes: Restaurante[]
  nomePesquisado: string
  processando: boolean

  constructor(
    private restaurantesService: RestaurantesService,
    private alertDialog: AlertDialogService
  ) {}

  ngOnInit() {
    this.processando = false
    this.getRestaurantes()
  }

  getRestaurantes(): void {
    this.processando = true
    this.restaurantesService.getRestaurantes().subscribe(data => {
      this.dataSource.data = data
      this.processando = false
    })
  }

  chamarExclusao(restaurante: Restaurante): void {
    this.alertDialog
      .abrirDialog('Atenção', `Confirma a exclusão do restaurante ${restaurante.nome}?`)
      .subscribe(resultado => {
        if (resultado) {
          this.delete(restaurante)
        }
      })
  }

  delete(restaurante: Restaurante): void {
    this.dataSource.data = this.dataSource.data.filter(h => h !== restaurante)
    this.restaurantesService.deleteRestaurante(restaurante.id).subscribe()
  }

  pesquisar() {
    if (this.nomePesquisado) {
      this.processando = true
      this.dataSource.data = []
      this.restaurantesService.searchRestaurantes(this.nomePesquisado).subscribe(data => {
        this.dataSource.data = data
        this.processando = false
      })
    } else {
      this.getRestaurantes()
    }
    this.nomePesquisado = ''
  }

  formatarIdNome(element: string) {
    return element.replace(new RegExp(' ', 'g'), '_')
  }

  formatarIdBtnRemover(element: string) {
    return 'btn-remover-' + this.formatarIdNome(element)
  }

  formatarIdBtnEditar(element: string) {
    return 'btn-editar-' + this.formatarIdNome(element)
  }
}
