import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogInfoContentComponent } from './dialog-info-content.component';
@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss'],
})
export class DialogInfoComponent {
  constructor(public dialog: MatDialog) {}

  openInfoDialog(): void {
    this.dialog.open(DialogInfoContentComponent);
  }
}
