import { Component, OnInit } from '@angular/core';
import { Prato } from '../models/prato'
import { PratosService } from '../services/pratos.service'
import { AlertDialogService } from '../alert-dialog/alert-dialog.component'
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-pratos',
  providers: [PratosService, AlertDialogService],
  templateUrl: './pratos.component.html',
  styleUrls: ['./pratos.component.css']
})
export class PratosComponent implements OnInit {
  displayedColumns: string[] = ['delete', 'edit', 'nome', 'restaurante', 'prato', 'preco'];
  dataSource = new MatTableDataSource();
  pratos: Prato[];
  nomePesquisado: string
  processando: boolean

  constructor(private pratosService: PratosService, private alertDialog: AlertDialogService) { }

  ngOnInit() {
    this.processando = false;
    this.getPratos();
  }

  getPratos(): void {
    this.processando = true;
    this.pratosService.getPratos()
      .subscribe(data => {
        this.dataSource.data = data;
        this.processando = false;
      });
  }

  add(nome: string): void {
    nome = nome.trim();
    if (!nome) { return; }

    const newPrato: Prato = { nome } as Prato;
    this.pratosService.addPrato(newPrato)
      .subscribe(data => this.dataSource.data.push(data));
  }

  chamarExclusao(prato: Prato): void {  
    this.alertDialog.abrirDialog('Atenção', 
    `Confirma a exclusão do prato ${prato.nome}?`).subscribe(resultado => {
        this.delete(prato);
    });
  }

  delete(prato: Prato): void {
    this.dataSource.data = this.dataSource.data.filter(h => h !== prato);
    this.pratosService.deletePrato(prato.id).subscribe();
  }

  pesquisar() {
    if (this.nomePesquisado) {
      this.processando = true;
      this.dataSource.data = [];
      this.pratosService.searchPratos(this.nomePesquisado)
        .subscribe(data => {
          this.dataSource.data = data;
          this.processando = false;
        });
    }
    else {
      this.getPratos();
    }
    this.nomePesquisado = '';
  } 
}
