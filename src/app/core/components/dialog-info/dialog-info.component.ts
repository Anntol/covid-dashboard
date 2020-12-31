import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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

@Component({
  selector: 'app-dialog-info-content',
  templateUrl: 'dialog-info-content.html',
  styleUrls: ['./dialog-info-content.scss'],
})
export class DialogInfoContentComponent {
  constructor(public dialog: MatDialog) {}
}
