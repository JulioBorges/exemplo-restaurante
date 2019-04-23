import { Component, Inject, Directive, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

export interface DialogData {
  titulo: string;
  mensagem: string;
}

@Injectable()
export class AlertDialogService {
  constructor(public dialog: MatDialog) {}

  abrirDialog(titulo: string, mensagem: string): Observable<boolean> {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(CorpoDialog, {
      width: '400px',
      data: { titulo: titulo, mensagem: mensagem }
    });

    return dialogRef.afterClosed();
  }
}

@Component({
  selector: 'app-alert-dialog-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class CorpoDialog {
  constructor(
    public dialogRef: MatDialogRef<CorpoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
